import React, { useState, useEffect, useContext } from "react";
import "../styles/Post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Post({ post }) {
  const { user: currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(post.likes.length);
  const [isClicked, setIsClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const PF = import.meta.env.REACT_PUBLIC_FOLDER || "/assets/";
  const [user, setUser] = useState({});
  const [moreClicked, setMoreClicked] = useState(false);
  console.log("[POST_IMG_URL]", PF + post.img);
  useEffect(() => {
    console.log("Post received in Post.jsx:", post);

    const fetchUser = async () => {
      if (!post?.userID) {
        console.warn("Missing userId in post:", post);
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users?userID=${post.userID}`
        );
        console.log("User API response:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [post]);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = async () => {
    try {
      await axios.put("http://localhost:3000/api/posts/" + post._id + "/like", {
        userID: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  const handleMore = () => {
    setMoreClicked(!moreClicked);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${post._id}`, {
        data: { userID: user._id },
      });
      alert("Post deleted!");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/api/posts/${post._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <Link to={`/profile/${user.username}`}>
              {post.img && console.log("Image filename:", post.img)}
              <img
                src={
                  user.profilePicture && user.profilePicture !== "default dp"
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="post-dp"
              />
            </Link>
            <div className="post-user-info">
              <span className="post-username">{user.username}</span>
              <span className="post-date">{format(post.createdAt)}</span>
            </div>
          </div>
          <div className="post-top-right">
            <button className="post-3dots" onClick={handleMore}>
              <MoreVertIcon />
            </button>
            {!moreClicked ? (
              ""
            ) : (
              <div className="more-container">
                <div className="more-options">
                  <div className="more-edit" onClick={handleEdit}>
                    <EditIcon />
                    Edit
                  </div>
                  <div
                    className="more-edit"
                    onClick={handleDelete}
                    style={{
                      color: "red",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <DeleteIcon
                      style={{
                        color: "red",
                        marginRight: "8px",
                        fontSize: "16px",
                      }}
                    />
                    Delete
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="post-mid">
          <div className="post-text">{post.desc}</div>
          {post.img && post.img !== "undefined" && (
            <img className="post-img" src={post.img} alt="post" />
          )}
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <div className="post-likes">
              {isLiked ? (
                <FavoriteIcon
                  className={`post-heart ${isClicked ? "clicked" : ""}`}
                  onClick={likeHandler}
                  style={{
                    color: "red",
                    fontSize: 30,
                    transition: "transform 0.2s",
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  className={`post-heart ${isClicked ? "clicked" : ""}`}
                  onClick={likeHandler}
                  style={{ fontSize: 30, transition: "transform 0.2s" }}
                />
              )}
              <div className="post-like-counter">
                <p>{like} people like this</p>
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
