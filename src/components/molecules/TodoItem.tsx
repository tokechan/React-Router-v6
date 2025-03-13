import React from "react";
import { Button, CheckBox, Text } from "../atoms";   

type TodoItemProps = {
    id: number;
    text: string;
    completed: boolean;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
     id, 
     text, 
     completed, 
     onDelete,
     onToggle 
}) => {
    return (
        <div className="todo-item">
            <CheckBox
                checked={completed}
                onChange={() => onToggle(id)}
            />
            <Text
            className={completed ? 'todo-item__text--completed' : 'todo-item__text'}
            >
                {text}
            </Text>
            <Button
                variant="danger"
                size="small"
                onClick={() => onDelete(id)}
            >
                Delete
            </Button>
        </div>
    );
};  
