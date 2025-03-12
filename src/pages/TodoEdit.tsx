import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



const TodoEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [text, setText] = useState("Sample Todo");

    const handleSave = () => {
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
