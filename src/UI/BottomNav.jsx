// src/UI/BottomNav.jsx
import { NavLink, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoCalendarOutline,
  IoHeartOutline,
  IoPeopleOutline
} from "react-icons/io5";
import { useEffect, useState } from "react";
import "../styles/BottomNav.css";

function BottomNav() {
  const location = useLocation();
  const [hasNewLikes, setHasNewLikes] = useState(
    localStorage.getItem("hasNewLikes") === "true"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setHasNewLikes(localStorage.getItem("hasNewLikes") === "true");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (location.pathname === "/likes") {
      localStorage.setItem("hasNewLikes", "false");
      setHasNewLikes(false);
    }
  }, [location.pathname]);

  return (
  <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <IoHomeOutline />
        <span className="nav-label">Home</span>
      </NavLink>

      <NavLink to="/events" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <IoCalendarOutline />
        <span className="nav-label">Events</span>
      </NavLink>

     <NavLink to="/browse" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <IoPeopleOutline />
        <span className="nav-label">Browse</span>
      </NavLink> 

      <NavLink to="/likes" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
  <div className="nav-like-wrapper">
    <IoHeartOutline />
    {hasNewLikes && <span className="notif-dot" />}
  </div>
  <span className="nav-label">Likes</span>
</NavLink>

    </nav>
  );
}

export default BottomNav;
