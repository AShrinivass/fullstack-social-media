import React from "react";
import "../styles/Online.css";

function Online({ user }) {
  const PF = import.meta.env.REACT_APP_PUBLIC_FOLDER || "/assets/";

  return (
    <>
      <div className="online-frnds-wrapper">
        <ul className="online-frnds">
          <li className="online-frnd">
            <img
              src={PF + user.profilePicture}
              alt="dp"
              className="online-frnd-img"
            />
            <span className="online-badge"></span>
            <span className="online-frnd-name">{user.username}</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Online;
