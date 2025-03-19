import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";
import TodoCreate from "./pages/TodoCreate";
import TodoEdit from "./pages/TodoEdit";
import MemoCreate from "./pages/MemoCreate";
import MemoEdit from "./pages/MemoEdit";
import MemoDetail from "./pages/MemoDetail";
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
            {/* Todoルート（後方互換性のため残す） */}
            <Route path="/todo/new" element={<TodoCreate />} />  
            <Route path="/todo/:id" element={<TodoDetail  />} />  
            <Route path="/todo/:id/edit" element={<TodoEdit  />} />
            
            {/* メモアプリ用の新しいルート */}
            <Route path="/memo/new" element={<MemoCreate />} />  
            <Route path="/memo/:id" element={<MemoDetail />} />  
            <Route path="/memo/:id/edit" element={<MemoEdit />} />
              
            <Route path="*" element={<NotFound />} />  
          </Routes>
        </Router>   
      </TodoProvider>
    </MemoProvider>
  );
}

export default App;