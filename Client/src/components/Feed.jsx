import React, { useEffect, useState } from "react";
import "../styles/Feed.css";
import Share from "./Share";
import Post from "./Post";
import axios from "axios";

function Feed() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/post/timeline/67ff2c7ee54868b8d260833b"
      );
      console.log("API response:", res.data);
      setPost(res.data);
    };
    fetchPosts();
  }, []);

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
