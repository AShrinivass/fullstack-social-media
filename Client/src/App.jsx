import { useContext, useState } from "react";
import "./styles/App.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login";
import { AuthContext } from "./contexts/AuthContext.jsx";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Register />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
