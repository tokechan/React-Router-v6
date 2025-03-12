import { useState } from "react";
import { Todo } from "../types";
import { Link, useNavigate, useParams } from "react-router-dom";


const TodoDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [todo] = useState<Todo>({ id: Number(id), text: "Sample Todo", completed: false});

    const handleDelete = () => {
        navigate("/");
    };

    return (
        <div>
            <h1>{todo.text}</h1>
            <Link to={`/todo/${todo.id}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
            <Link to="/">Back</Link>
        </div>
    );
};

export default TodoDetail;