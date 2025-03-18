
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type Memo = {
  id?: number;
  content: string;
  status: string;
  creator: string;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
};
