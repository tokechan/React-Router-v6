import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  completed: z.boolean().default(false),
});

// 型定義の自動生成
export type TodoFormData = z.infer<typeof todoSchema>;