import { Link } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";
import { Button, CheckBox, Text } from "../components/atoms";

const Home = () => {
    const  { todos, deleteTodo, toggleTodoCompletion } =useTodoContext()
    
    return (
        <div className="home-container">
            <Text variant="h1">Todo List</Text>

            <div className="actions">
                <Link to="/todo/new">
                    <Button variant="primary">New Todo</Button>
                </Link>
            </div>

            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        <div className="todo-item__checkbox">
                            <CheckBox
                                checked={todo.completed}
                                onChange={() => toggleTodoCompletion(todo.id)}
                            />
                        
                            <Link to={`/todo/${todo.id}`} className="todo-item__Link">
                                <span className={todo.completed ? 'completed' : ''}>
                                    {todo.text}
                                </span>
                            </Link>
                        </div>
                        <Button
                            variant="danger"
                            size="small"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;


// import { TodoForm, TodoList } from '../components/organisms';
// import { useTodoContext } from '../context/TodoContext';

// const Home = () => {
//   const { todos, addTodo, deleteTodo, toggleTodoCompletion } = useTodoContext();

//   return (
//     <div className="home-container">
//       <h1>Todo App</h1>
//       <TodoForm onAddTodo={addTodo} />
//       <TodoList 
//         todos={todos}
//         onToggleTodo={toggleTodoCompletion}
//         onDeleteTodo={deleteTodo}
//       />
//     </div>
//   );
// };

// export default Home;