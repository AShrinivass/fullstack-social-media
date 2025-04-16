import React from "react";
import "../styles/Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";

function Navbar() {
  const PF = import.meta.env.REACT_APP_PUBLIC_FOLDER || "/assets/";
  return (
    <div className="nav-component">
      <div className="nav-left">
        <Link
          to="/"
          className="nav-logo"
          style={{ textDecoration: "none", color: "white" }}
        >
          Cheapbook
        </Link>
      </div>

      <div className="nav-ctr">
        <div className="search-bar">
          <SearchIcon className="search-icon" />
          <input placeholder="Search" className="search-input" />
        </div>
      </div>

      <div className="nav-right">
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/profile" className="nav-link">
            Timeline
          </Link>
        </div>

        <div className="nav-icons">
          <div className="nav-icon-item">
            <PersonIcon />
            <span className="nav-notif-badge">1</span>
          </div>
          <div className="nav-icon-item">
            <ChatIcon />
            <span className="nav-notif-badge">1</span>
          </div>
          <div className="nav-icon-item">
            <NotificationsIcon />
            <span className="nav-notif-badge">1</span>
          </div>
        </div>
        <img className="nav-dp" src={PF + "person/1.jpeg"} alt="DP" />
      </div>
    </div>
  );
}

export default Navbar;
