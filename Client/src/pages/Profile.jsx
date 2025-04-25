import "../styles/Profile.css";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import Feed from "../components/Feed";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Profile() {
  const { username } = useParams();
  const PF = import.meta.env.REACT_APP_PUBLIC_FOLDER || "/assets/";
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users?username=${username}`
        );
        console.log("Fetched User:", res.data);
        console.log("Username from URL:", username);
        console.log("User API response:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [username]);

  console.log("User object in Profile:", user);

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
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profile-user-img"
                src={
                  user.profilePicture && user.profilePicture !== "default dp"
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profile-info">
              <h4 className="profile-info-name">
                {user?.username || "Loading..."}
              </h4>
              <span className="profile-info-desc">
                {user?.desc || "No description"}
              </span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed username={user.username} />
            <Rightbar profile={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
