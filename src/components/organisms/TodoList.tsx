import { TodoItem } from "../molecules";
import { Text } from "../atoms/Text";
import { Todo } from "../../types"
type TodoListProps = {
    todos: Todo[];
    onToggleTodo: (id: number) => void;
    onDeleteTodo: (id: number) => void;
    className?: string;
};


export const TodoList = ({
    todos,
    onToggleTodo,
    onDeleteTodo,
    className = ''
}: TodoListProps) => {
    //Todoがからの場合のメッセ
    if (todos.length === 0) {
        return (
            <div className={`todo-list ${className}`}>
                <Text variant="body1" align="center" color="secondary">
                    No todos found, please add a new todo.
                </Text>
            </div>
        );
    }

    return (
        <div className={`todo-list ${className}`}>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    completed={todo.completed}
                    onDelete={onDeleteTodo}
                    onToggle={onToggleTodo}
                />
            ))}
        </div>
    );
};