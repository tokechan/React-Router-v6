import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";
import { Button } from "../components/atoms";


const TodoCreate = () => {
    const navigate = useNavigate();
    const { addTodo } = useTodoContext();
    const [text, setText] = useState("");

    const handeleCreate = () => {
        if(!text.trim()) return;
        addTodo(text);
        navigate("/");
    };

    return (
        <div>
            <h1>Create Todo</h1>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            {/* <button onClick={handeleCreate}>Create</button>
            <button onClick={() => navigate(-1)}>Cancel</button> */}
            <Button onClick={handeleCreate}>Create</Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    );
};

export default TodoCreate;