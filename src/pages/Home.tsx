import { Todo } from "../types";
import { Link } from "react-router-dom";


//propsの型定義
type Props = {
    todos: Todo[];
};

const Home = ({ todos }: Props) => {
    return (
        <div>
            <h1>Todo List</h1>
            <Link to="/todo/new">New Todo</Link>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <Link to={`/todo/${todo.id}`}>{todo.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;