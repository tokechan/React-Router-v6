import { useState } from "react";
import { Todo } from "../types";
import { Link } from "react-router-dom";


const Home = () => {
    const [todos, setTodos] = useState<Todo[]>([
        {id: 1, text: "demo todo app", completed: false},
        {id: 2, text: "demo react router v6", completed: false},
    ]);

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