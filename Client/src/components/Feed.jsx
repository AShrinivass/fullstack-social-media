import React, { useContext, useEffect, useState } from "react";
import "../styles/Feed.css";
import Share from "./Share";
import Post from "./Post";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

function Feed({ username }) {
  const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`http://localhost:3000/api/posts/profile/${username}`)
        : await axios.get(
            "http://localhost:3000/api/posts/timeline/" + user._id
          );
      console.log("API response:", res.data);
      setPost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed-element">
      <Share />
      {post.map((p) => (
        <Post post={p} key={p._id} />
      ))}
    </div>
  );
}

export default Feed;
