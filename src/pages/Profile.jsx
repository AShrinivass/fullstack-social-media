import "../styles/Profile.css";
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import Feed from "../components/Feed";

function Profile() {
  const PF = import.meta.env.REACT_APP_PUBLIC_FOLDER || "/assets/";
  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img
                className="profile-cover-img"
                src={PF + "post/3.jpeg"}
                alt=""
              />
              <img
                className="profile-user-img"
                src={PF + "person/7.jpeg"}
                alt=""
              />
            </div>
            <div className="profile-info">
              <h4 className="profile-info-name">A Shrinivas</h4>
              <span className="profile-info-desc">Yo ngas</span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed />
            <Rightbar profile={true} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
