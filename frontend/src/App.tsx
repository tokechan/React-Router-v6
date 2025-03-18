import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";
import TodoCreate from "./pages/TodoCreate";
import TodoEdit from "./pages/TodoEdit";
import NotFound from "./pages/NotFound";
import { TodoProvider } from "./context/TodoContext";
import { MemoProvider } from "./context/MemoContext";

//Routingの設定
function App() {
  return (
    <MemoProvider>
      <TodoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo/new" element={<TodoCreate />} />  
            <Route path="/todo/:id" element={<TodoDetail  />} />  
            <Route path="/todo/:id/edit" element={<TodoEdit  />} />  
            <Route path="*" element={<NotFound />} />  
          </Routes>
        </Router>   
      </TodoProvider>
    </MemoProvider>
  );
}

export default App;
