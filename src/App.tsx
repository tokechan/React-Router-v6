import { useState } from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";
import TodoCreate from "./pages/TodoCreate";
import TodoEdit from "./pages/TodoEdit";
import NotFound from "./pages/NotFound";
import { Todo } from "./types";
import { TodoProvider } from "./context/TodoContext";
//Routingの設定
function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {id: 1, text: "demo todo app", completed: false},
    {id: 2, text: "demo react router v6", completed: false},
]);


  return (
    <TodoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home todos={todos}  />} />
          <Route path="/todo/new" element={<TodoCreate todos={todos} setTodos={setTodos} />} />  
          <Route path="/todo/:id" element={<TodoDetail  todos={todos} setTodos={setTodos}/>} />  
          <Route path="/todo/:id/edit" element={<TodoEdit  todos={todos} setTodos={setTodos}/>} />  
          <Route path="*" element={<NotFound />} />  
        </Routes>
      </Router>   
    </TodoProvider>
  );
}

export default App;
