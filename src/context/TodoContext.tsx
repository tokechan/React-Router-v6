import { createContext, ReactNode, useContext } from "react";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "../types";

//Contextの型
type TodoContextType = {
    todos: Todo[];
    addTodo: (text: string) => void;
    updateTodo: (id: number, text: string) => void;
    deleteTodo: (id: number) => void;
}

//Contextの作成
const TodoContext = createContext<TodoContextType | undefined>(undefined);

//Provider コンポーネント
export const TodoProvider = ({ children }: { children: ReactNode }) => {
    //useTodosフックを使用してTodo関連のロジックを取得
    const  { todos, addTodo, updateTodo, deleteTodo} = useTodos();
    
    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo}}>
            {children}
        </TodoContext.Provider>
    );
};

//Contextを簡単に使うためのcustomhook
export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodoContext must be used within a TodoProvider");
    }
    return context;
};