import { Link } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";


const Home = () => {
    const  { todos } =useTodoContext()
    
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