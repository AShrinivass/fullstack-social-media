import React from "react";
import "../styles/Share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LabelIcon from "@mui/icons-material/Label";
import PlaceIcon from "@mui/icons-material/Place";

function Share() {
  return (
    <div className="share-container">
      <div className="share-wrapper">
        <div className="share-top">
          <div className="share-dp-container">
            <img src="../assets/person/1.jpeg" alt="" className="share-dp" />
          </div>
          <div className="share-input">
            <input placeholder="what's on your mind" className="share-input" />
          </div>
        </div>
        <hr className="share-sep" />
        <div className="share-bottom">
          <div className="share-options">
            <div className="share-option">
              <PermMediaIcon className="share-icon" htmlColor="tomato" />
              <span className="share-optn-desc">Photo or video</span>
            </div>
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
          <button className="share-btn">Share</button>
        </div>
      </div>
    </div>
  );
}

export default Share;
