import { Todo } from "../types";
import { Link, useNavigate, useParams } from "react-router-dom";

type Props = {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoDetail = ({ todos, setTodos }: Props) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const todo = todos.find((t) => t.id === Number(id));
    
    if (!todo) return <p>Todo not found</p>;

    const handleDelete = () => {
        setTodos(todos.filter(t => t.id !== todo.id));
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