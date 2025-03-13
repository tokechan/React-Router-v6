import  { useState } from "react";
import { Todo } from "../types";

/**
 * Todo管理のためのカスタムフック
 * Todoの一覧取得、追加、編集、削除
 */
export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([
        {
            id: 1,
            text: "Todo 1",
            completed: false
        },
        {
            id: 2,
            text: "Todo 2",
            completed: false
        },
        {
            id: 3,
            text: "Todo 3",
            completed: false
        }
    ])
     
    /**
     * Todoを追加
     * @param text Todoの内容
     */
    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: todos.length + 1,
            text,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    /**
     * Todoを編集
     * @param id 更新対象のID
     * @param text 新しいTodo内容
     */
    const updateTodo = (id: number, text: string) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
    };

    /**
     * Todoを削除
     * @param id 削除対象のID
     */
    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return {
        todos,
        addTodo,
        updateTodo,
        deleteTodo
    };
}