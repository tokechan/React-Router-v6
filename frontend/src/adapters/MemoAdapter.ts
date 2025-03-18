import { Memo } from '../types';
import { Todo } from '../components/organisms/TodoList';

/**
 * Memo型のデータをTodo型に変換するアダプター
 */
export const memoToTodo = (memo: Memo): Todo => {
  return {
    id: memo.id || 0,
    text: `${memo.content} (${memo.creator}) - ${memo.status}`,
    completed: memo.completed
  };
};

/**
 * Memo型の配列をTodo型の配列に変換する
 */
export const memosToTodos = (memos: Memo[]): Todo[] => {
  return memos.map(memo => memoToTodo(memo));
};