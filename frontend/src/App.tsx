import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MemoCreate from "./pages/MemoCreate";
import MemoEdit from "./pages/MemoEdit";
import MemoDetail from "./pages/MemoDetail";
import NotFound from "./pages/NotFound";
import { MemoProvider } from "./context/MemoContext";

//Routingの設定
function App() {
  return (
    <MemoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* メモアプリ用のルート */}
          <Route path="/memo/new" element={<MemoCreate />} />  
          <Route path="/memo/:id" element={<MemoDetail />} />  
          <Route path="/memo/:id/edit" element={<MemoEdit />} />
            
          <Route path="*" element={<NotFound />} />  
        </Routes>
      </Router>   
    </MemoProvider>
  );
}

export default App;