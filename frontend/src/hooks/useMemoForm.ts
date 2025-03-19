import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// メモフォームのスキーマ定義
export const memoSchema = z.object({
  content: z.string().min(1, '内容を入力してください'),
  creator: z.string().min(1, '作成者を選択してください'),
  status: z.string().optional(),
  completed: z.boolean().optional()
});

export type MemoFormData = z.infer<typeof memoSchema>;

/**
 * メモフォーム用のカスタムフック
 * @param initialData 初期データ（編集時に使用）
 * @returns React Hook Formのメソッド
 */
export const useMemoForm = (initialData?: Partial<MemoFormData>) => {
  const methods = useForm<MemoFormData>({
    resolver: zodResolver(memoSchema),
    defaultValues: {
      content: initialData?.content || '',
      creator: initialData?.creator || '夫',
      status: initialData?.status || 'メモっとくね',
      completed: initialData?.completed || false,
    },
  });

  return methods;
};