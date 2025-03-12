import { Link, useNavigate, useParams } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";

const TodoDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { todos, deleteTodo } = useTodoContext();
    const todo = todos.find((t) => t.id === Number(id));
    
    if (!todo) return <p>Todo not found</p>;

    const handleDelete = () => {
        deleteTodo(Number(id));
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