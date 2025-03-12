import { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "../types";

type Props = {
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
};

const TodoCreate = ({ todos, setTodos }: Props) => {
    const navigate = useNavigate();
    const [text, setText] = useState("");

    const handeleCreate = () => {
        // Create a new todo with a unique ID
        const newTodo: Todo = {
            id: todos.length + 1,
            text: text,
            completed: false
        };
        
        // Add the new todo to the todos array
        setTodos([...todos, newTodo]);
        navigate("/");
    };

    return (
        <div>
            <h1>Create Todo</h1>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handeleCreate}>Create</button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
};

export default TodoCreate;