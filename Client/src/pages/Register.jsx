import { useContext, useRef } from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value != password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords do not match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
    }

    try {
      await axios.post("http://localhost:3000/api/auth/register", user);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

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
              placeholder="Username"
              className="login-input"
              ref={username}
              required
            />
            <input
              placeholder="Email"
              className="login-input"
              ref={email}
              required
              type="email"
            />
            <input
              placeholder="Password"
              className="login-input"
              ref={password}
              required
              type="password"
              minLength="6"
            />
            <input
              placeholder="Confirm Passowrd"
              className="login-input"
              ref={passwordAgain}
              required
              type="password"
              minLength="6"
            />
            <button className="login-button" type="submit">
              Sign Up
            </button>
            <Link className="login-register-button" to="/login">
              Log In
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
