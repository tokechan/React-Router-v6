import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Todo } from "../types";

type Props = {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoEdit = ({ todos, setTodos }: Props) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const todo = todos.find((t) => t.id === Number(id));

    const [text, setText] = useState(todo?.text || "");

    const handleSave = () => {
        if (!text.trim()) return;   
        
        setTodos(
            todos.map((t) => 
            t.id === Number(id)  ? { ...t, text, } : t
        )
    );
        navigate("/");
    };

    return (
        <div>
            <h1>Edit Todo</h1>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
};

export default TodoEdit;
