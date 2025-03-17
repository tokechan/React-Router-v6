import { useNavigate } from "react-router-dom";
import { Text } from "../components/atoms";
import { Input } from "../components/atoms";
import { Button } from "../components/atoms";
import styled from "styled-components";
import { useTodoContext } from "../context/TodoContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
  background-color: pink;
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
  align-items: center;
  text-align: center;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
`;

const StyledInput = styled(Input)`
  max-width: 500px;
  text-align: center;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: 8px;
  text-align: center;
`;

// Zodスキーマの定義
const todoSchema = z.object({
  text: z.string()
    .min(1, "共有内容を入力してください")
    .max(100, "100文字以内で入力してください")
});

// フォームの型定義
type TodoFormValues = z.infer<typeof todoSchema>;

const TodoCreate = () => {
    const navigate = useNavigate();
    const { addTodo } = useTodoContext();
    
    // React Hook Formの設定
    const { 
      register, 
      handleSubmit, 
      formState: { errors, isValid, isSubmitting },
      reset
    } = useForm<TodoFormValues>({
      resolver: zodResolver(todoSchema),
      mode: "onChange"
    });

    const onSubmit = (data: TodoFormValues) => {
        addTodo(data.text);
        reset();
        navigate("/");
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <Container>
            <Header>
                <Text variant="h1">現状共有でーす</Text>
                <Text variant="p">これでモレをなくそう</Text>
            </Header>

            <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Text variant="label">共有すること</Text>
                        <StyledInput
                            $inputSize="large"
                            $fullWidth
                            placeholder="共有しまーす"
                            {...register("text")}
                            autoFocus
                        />
                        {errors.text && (
                            <ErrorMessage>{errors.text.message}</ErrorMessage>
                        )}
                    </FormGroup>

                    <ButtonGroup>
                        <Button
                            variant="primary"
                            size="medium"
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            書き記す
                        </Button>
                        <Button
                            variant="secondary"
                            size="medium"
                            type="button"
                            onClick={handleCancel}
                        >
                            必要なかった
                        </Button>
                    </ButtonGroup>
                </form>
            </FormContainer>
        </Container>
    );
};

export default TodoCreate;