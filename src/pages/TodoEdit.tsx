import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";

const TodoEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { todos, updateTodo } = useTodoContext();
    const todo = todos.find((t) => t.id === Number(id));

    const [text, setText] = useState(todo?.text || "");

    const handleSave = () => {
        if (!text.trim()) return;   
        updateTodo(Number(id), text);
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
