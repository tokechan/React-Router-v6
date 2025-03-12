import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Routingの設定
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo/new" element={<TodoCreate />} />  
        <Route path="/todo/:id" element={<TodoDetail  />} />  
        <Route path="/todo/:id/edit" element={<TodoEdit  />} />  
        <Route path="*" element={<NotFound />} />  
      </Routes>
    </Router>   
  );
}

export default App;
