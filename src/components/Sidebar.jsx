import { useState } from "react";
import "../styles/Sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Friends from "./Friends.jsx";
import { Users, Posts } from "../dummyData.js";

function Sidebar() {
  const [showMore, setShowmore] = useState(false);

  const handleShowMore = () => {
    setShowmore(!showMore);
  };

  return (
    <div className="sidebar-element">
      <div className="sidebar-lists">
        <ul className="sidebar-list">
          <li>
            <RssFeedIcon className="sidebar-icon" />
            <span className="sidebar-icon-name">Feed</span>
          </li>
          <li>
            <ChatIcon className="sidebar-icon" />
            <span className="sidebar-icon-name">Chats</span>
          </li>
          <li>
            <PlayCircleIcon className="sidebar-icon" />
            <span className="sidebar-icon-name">Reels</span>
          </li>
          <li>
            <GroupIcon className="sidebar-icon" />
            <span className="sidebar-icon-name">Groups</span>
          </li>
          <li>
            <BookmarkIcon className="sidebar-icon" />
            <span className="sidebar-icon-name">Saved</span>
          </li>
          <li>
            <GroupIcon className="sidebar-icon" />
            <span className="sidebar-icon-name">Questions</span>
          </li>
          <li>
            <WorkIcon className="sidebar-icon" />
            <span className="sidebar-icon-name">Jobs</span>
          </li>
          <li>
            <EventIcon className="sidebar-icon" />
            <span className="sidebar-icon-name">Events</span>
          </li>
          <li>
            <MenuBookIcon className="sidebar-icon" />
            <span className="sidebar-icon-name">Courses</span>
          </li>
          <li className="btn-wrapper">
            <button className="btn-show-more" onClick={handleShowMore}>
              {showMore ? "Show less" : "Show more"}
            </button>
          </li>
        </ul>
        {showMore && (
          <div>
            <hr className="sidebar-hr active" />
            {Users.map((u) => (
              <Friends user={u} key={u.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
