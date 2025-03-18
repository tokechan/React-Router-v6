import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoSchema, TodoFormData } from '../schemas/todoSchema';

/**
 * Todoフォーム用のカスタムフック
 * @param initialData 初期データ（編集時に使用）
 * @returns React Hook Formのメソッド
 */
export const useTodoForm = (initialData?: Partial<TodoFormData>) => {
  const methods = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      dueDate: initialData?.dueDate || '',
      priority: initialData?.priority || 'medium',
      completed: initialData?.completed || false,
    },
  });

  return methods;
};
