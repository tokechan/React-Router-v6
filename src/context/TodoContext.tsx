import { createContext, ReactNode, useContext } from "react";
import { useState } from "react";
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
    const  [todos, setTodos] = useState<Todo[]>([
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
    ]);

    //Todo add
    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: todos.length + 1,
            text,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    //Todo update
    const updateTodo = (id: number, text: string) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
    };

    //Todo delete
    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };
    
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