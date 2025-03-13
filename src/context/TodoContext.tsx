import { createContext, ReactNode, useContext } from "react";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "../types";

//Contextの型
type TodoContextType = {
    todos: Todo[];
    addTodo: (text: string) => void;
    updateTodo: (id: number, text: string) => void;
    deleteTodo: (id: number) => void;
    toggleTodoCompletion: (id: number) => void;
}

//default value
const TodoContext = createContext<TodoContextType>({
    todos: [],
    addTodo: () => {},
    updateTodo: () => {},
    deleteTodo: () => {},
    toggleTodoCompletion: () => {}
});

type TodoProviderProps = {
    children: ReactNode;
};

//Contextの作成
// const TodoContext = createContext<TodoContextType | undefined>(undefined);

//Provider コンポーネント
export const TodoProvider = ({ children }: TodoProviderProps) => {
    //useTodosフックを使用してTodo関連のロジックを取得
    const  { todos, addTodo, updateTodo, deleteTodo, toggleTodoCompletion } = useTodos();
    
    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodoCompletion}}>
            {children}
        </TodoContext.Provider>
    );
};

//Contextを簡単に使うためのcustomhook
export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error("useTodoContext must be used within a TodoProvider");
    }
    return context;
};