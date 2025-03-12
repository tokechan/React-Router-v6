import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoCreate = () => {
    const navigate = useNavigate();
    const [text, setText] = useState("");

    const handeleCreate = () => {
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