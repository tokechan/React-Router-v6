// src/pages/MemoEdit.tsx
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "../components/atoms";
import { Input } from "../components/atoms";
import { Button } from "../components/atoms";
import styled from "styled-components";
import { useMemoContext } from "../context/MemoContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Memo } from "../types";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const Header = styled.div`
  margin-bottom: 32px;
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const StyledInput = styled(Input)<{ $fullWidth?: boolean }>`
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 14px;
  margin-top: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

// メモフォームのバリデーションスキーマ
const memoSchema = z.object({
  content: z.string().min(1, { message: 'メモの内容は必須です' }),
  creator: z.enum(['夫', '妻'], { 
    required_error: '作成者を選択してください',
    invalid_type_error: '作成者は「夫」または「妻」を選択してください'
  }),
  status: z.string().default('メモっとくね'),
  completed: z.boolean().default(false)
});

type MemoFormValues = z.infer<typeof memoSchema>;

const MemoEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { memos, updateMemoItem } = useMemoContext();
    const [loading, setLoading] = useState(true);
    const [memo, setMemo] = useState<Memo | null>(null);
    
    // React Hook Formの設定
    const { 
      register, 
      handleSubmit, 
      formState: { errors, isValid, isSubmitting },
      reset,
      setValue
    } = useForm<MemoFormValues>({
      resolver: zodResolver(memoSchema),
      mode: "onChange"
    });

    // メモデータの取得
    useEffect(() => {
      if (id && memos.length > 0) {
        const foundMemo = memos.find(m => m.id === Number(id));
        if (foundMemo) {
          setMemo(foundMemo);
          // フォームに値をセット
          setValue('content', foundMemo.content);
          setValue('creator', foundMemo.creator as '夫' | '妻');
          setValue('status', foundMemo.status);
          setValue('completed', foundMemo.completed);
        }
        setLoading(false);
      }
    }, [id, memos, setValue]);

    const onSubmit = async (data: MemoFormValues) => {
        if (!id) return;
        
        try {
          await updateMemoItem(Number(id), {
            content: data.content,
            creator: data.creator,
            status: data.status,
            completed: data.completed
          });
          navigate("/");
        } catch (error) {
          console.error('メモの更新に失敗しました:', error);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    if (loading) {
      return (
        <Container>
          <Text variant="h4" align="center">読み込み中...</Text>
        </Container>
      );
    }

    if (!memo) {
      return (
        <Container>
          <Text variant="h4" align="center">メモが見つかりませんでした</Text>
          <Button
            variant="primary"
            size="medium"
            onClick={() => navigate("/")}
          >
            ホームに戻る
          </Button>
        </Container>
      );
    }

    return (
        <Container>
            <Header>
                <Text variant="h1">夫婦の共有</Text>
                <Text variant="p">メモを編集します</Text>
            </Header>

            <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Text variant="label">メモの内容</Text>
                        <StyledInput
                            $inputSize="large"
                            $fullWidth
                            placeholder="メモの内容を入力してください"
                            {...register("content")}
                            autoFocus
                        />
                        {errors.content && (
                            <ErrorMessage>{errors.content.message}</ErrorMessage>
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Text variant="label">作成者</Text>
                        <RadioGroup>
                            <RadioLabel>
                                <input 
                                  type="radio" 
                                  value="夫" 
                                  {...register("creator")} 
                                />
                                <Text variant="p">夫</Text>
                            </RadioLabel>
                            <RadioLabel>
                                <input 
                                  type="radio" 
                                  value="妻" 
                                  {...register("creator")} 
                                />
                                <Text variant="p">妻</Text>
                            </RadioLabel>
                        </RadioGroup>
                        {errors.creator && (
                            <ErrorMessage>{errors.creator.message}</ErrorMessage>
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Text variant="label">完了状態</Text>
                        <RadioLabel>
                            <input 
                              type="checkbox" 
                              {...register("completed")} 
                            />
                            <Text variant="p">完了済み</Text>
                        </RadioLabel>
                    </FormGroup>

                    <ButtonGroup>
                        <Button
                            variant="primary"
                            size="medium"
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            更新する
                        </Button>
                        <Button
                            variant="secondary"
                            size="medium"
                            type="button"
                            onClick={handleCancel}
                        >
                            キャンセル
                        </Button>
                    </ButtonGroup>
                </form>
            </FormContainer>
        </Container>
    );
};

export default MemoEdit;