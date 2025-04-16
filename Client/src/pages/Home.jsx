import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import Feed from "../components/Feed";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <main className="home-main-content">
        <Sidebar />
        <Feed />
        <Rightbar profile={false} />
      </main>
    </div>
  );
}

export default Home;
