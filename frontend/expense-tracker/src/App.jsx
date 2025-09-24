import { Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";
import Home from "./pages/Dashboard/Home";
import UserProvider from "./context/userContext";


function App() {
  return (
    <UserProvider>
    <div>
      <Routes>
        <Route path="/" element={<Root/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/dashboard" element={<Home/>} />
        <Route path="/income" element={<Income />} />
      </Routes>
    </div>
    </UserProvider>
  );
}

export default App;

const Root = () => {

  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to ="/dashboard" replace />
  ) : (
    <Navigate to ="/login" replace />
  );
}
