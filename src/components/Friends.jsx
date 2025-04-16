import React from "react";
import "../styles/Friends.css";
const PF = import.meta.env.REACT_APP_PUBLIC_FOLDER || "/assets/";

function Friends({ user }) {
  return (
    <>
      <div className="frnds-wrapper">
        <ul className="frnds">
          <li className="frnd">
            <img src={PF + user.profilePicture} alt="dp" className="frnd-img" />
            <span className="frnd-name">{user.username}</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Friends;
