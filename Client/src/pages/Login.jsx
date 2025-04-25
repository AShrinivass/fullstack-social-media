import { useRef, useContext } from "react";
import "../styles/Login.css";
import { loginCall } from "../apiCalls.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">Cheapbook</h3>
          <span className="login-desc">A fullstack project</span>
        </div>
        <div className="login-right">
          <form className="login-box" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="login-input"
              ref={email}
            />
            <input
              placeholder="Password"
              className="login-input"
              type="password"
              required
              minLength="6"
              ref={password}
            />
            <button className="login-button" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log in"
              )}
            </button>
            <span className="login-forgot">Forgot Password?</span>
            <button className="login-register-button" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create New User"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
