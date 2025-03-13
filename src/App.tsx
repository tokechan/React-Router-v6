import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";
import TodoCreate from "./pages/TodoCreate";
import TodoEdit from "./pages/TodoEdit";
import NotFound from "./pages/NotFound";
import { TodoProvider } from "./context/TodoContext";
//Routingの設定
function App() {



  return (
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
  );
}

export default App;
