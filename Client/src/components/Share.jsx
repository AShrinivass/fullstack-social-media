import React, { useContext, useRef, useState } from "react";
import "../styles/Share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LabelIcon from "@mui/icons-material/Label";
import PlaceIcon from "@mui/icons-material/Place";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function Share() {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER || "/assets/";
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userID: user._id,
      desc: desc.current.value,
    };

    if (file) {
      try {
        const base64 = await convertToBase64(file);
        newPost.img = base64;
      } catch (err) {
        console.log("Error converting file to base64:", err);
      }
    }

    try {
      await axios.post("http://localhost:3000/api/post", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share-container">
      <form className="share-wrapper" onSubmit={submitHandler}>
        <div className="share-top">
          <div className="share-dp-container">
            <img
              className="share-dp"
              src={
                user.profilePicture && user.profilePicture !== "default dp"
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt="DP"
            />
          </div>
          <div className="share-input">
            <input
              ref={desc}
              placeholder={`what's on your mind ${user.username}?`}
              className="share-input"
            />
          </div>
        </div>
        <hr className="share-sep" />
        <div className="share-bottom">
          {file && (
            <div className="share-img-preview">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="share-img"
              />
            </div>
          )}
          <div className="share-options">
            <label className="share-option" htmlFor="file">
              <PermMediaIcon className="share-icon" htmlColor="tomato" />
              <span className="share-optn-desc">Photo or video</span>
              <input
                type="file"
                id="file"
                accept=".jpeg, .jpg, .png"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              ></input>
            </label>
            <div className="share-option">
              <LabelIcon className="share-icon" htmlColor="blue" />
              <span className="share-optn-desc">Tag</span>
            </div>
            <div className="share-option">
              <PlaceIcon className="share-icon" htmlColor="green" />
              <span className="share-optn-desc">Location</span>
            </div>
            <div className="share-option">
              <EmojiEmotionsIcon className="share-icon" htmlColor="goldenrod" />
              <span className="share-optn-desc">Feelings</span>
            </div>
          </div>
          <button className="share-btn" type="submit">
            Share
          </button>
        </div>
      </form>
    </div>
  );
}

export default Share;
