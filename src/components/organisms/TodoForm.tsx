import { useState } from "react";
import { Input } from "../atoms";
import { Button } from "../atoms";

type TodoFormProps = {
    onAddTodo: (text: string) => void;
    className?: string;
};

export const TodoForm = ({ onAddTodo, className = ''}: TodoFormProps) => {
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleSubit =(e: React.FormEvent) => {
        e.preventDefault();

        //入力値のバリデーション
        if (!text.trim()) {
            setError('Todo cannot be empty');
            return;
        }

        //Todoの追加
        onAddTodo(text);
        //入力値のクリア
        setText('');
        setError('');
    };

    return (
        <form
            onSubmit={handleSubit}
            className={`todo-form ${className}`}
        >
        <div className="todo-form__input-container">
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="New Todo please"
                error={error}
                fullWidth
            />
            </div>

            <Button
                type="submit"
                variant="primary"
            >
                Add Todo
            </Button>
        </form>
    )
}