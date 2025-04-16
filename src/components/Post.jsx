import React, { useState, useEffect } from "react";
import "../styles/Post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import {  format } from "timeago.js";

function Post({ post }) {
  const [like, setLike] = useState(false);
  const PF = import.meta.env.REACT_APP_PUBLIC_FOLDER || "/assets/";
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log("Post received in Post.jsx:", post);
    const fetchUser = async () => {
      if (!post?.userID) {
        console.warn("Missing userId in post:", post);
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/${post.userID}`
        );
        console.log("User API response:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [post]);

  const handleLike = () => {
    setLike(!like);
  };
  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt="whatever"
              className="post-dp"
            />
            <div className="post-user-info">
              <span className="post-username">{user.username}</span>
              <span className="post-date">{format(post.createdAt)}</span>
            </div>
          </div>
          <div className="post-top-right">
            <div className="post-3dots">
              <MoreVertIcon />
            </div>
          </div>
        </div>
        <div className="post-mid">
          <div className="post-text">{post.desc}</div>
          <img className="post-img" src={PF + post.img} alt="" />
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <div className="post-likes">
              <img
                src="../assets/heart.png"
                alt="Heart"
                className="post-heart"
                onClick={handleLike}
              />
              <div className="post-like-counter">
                <p>
                  {like
                    ? `${post.likes.length + 1} liked this`
                    : `${post.likes.length} liked this`}
                </p>
              </div>
            </div>
          </div>
          <div className="post-bottom-right">
            <div className="post-comments">{post.comment} comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
