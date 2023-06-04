import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todo />} />

        <Route path="/auth/*">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
