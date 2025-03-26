import { useEffect, useState, useRef } from "react";
import { users } from "../data/mockDB";
import { motion } from "framer-motion";
import { FaThLarge, FaBars, FaHeart, FaRedo } from "react-icons/fa";
import PublicProfileDrawer from "./PublicProfileDrawer";
import { currentUserId } from "../data/CurrentUser";
import "../styles/Browse.css";

const GENDERS = ["all", "male", "female", "non-binary"];
const INTERESTS = [
  "coffee", "art", "tech", "music", "hiking", "fitness",
  "outdoors", "photography", "casual", "social", "creative"
];

function Browse() {
  const [genderFilter, setGenderFilter] = useState(() => localStorage.getItem("genderFilter") || "all");
  const [interestFilter, setInterestFilter] = useState(() => localStorage.getItem("interestFilter") || "");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [viewMode, setViewMode] = useState(() => localStorage.getItem("viewMode") || "grid");
  const [selectedUser, setSelectedUser] = useState(null);
  const [likedIds, setLikedIds] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    refreshLikes();
  }, []);

  useEffect(() => {
    let result = users.filter((u) => u.id !== currentUserId);
    if (genderFilter !== "all") result = result.filter((u) => u.gender === genderFilter);
    if (interestFilter !== "") result = result.filter((u) => u.interests.includes(interestFilter));
    setFilteredUsers(result);

    localStorage.setItem("genderFilter", genderFilter);
    localStorage.setItem("interestFilter", interestFilter);
  }, [genderFilter, interestFilter]);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const refreshLikes = () => {
    const updated = JSON.parse(localStorage.getItem("likedUsers") || "[]");
    setLikedIds(updated);
  };

  const resetFilters = () => {
    setGenderFilter("all");
    setInterestFilter("");
    localStorage.removeItem("genderFilter");
    localStorage.removeItem("interestFilter");
  };

  return (
    <div className="browse-container">
      <div className="browse-header">
        <h1 className="browse-title">✨ Discover People</h1>
        <div className="view-toggle">
          <button className={viewMode === "row" ? "active" : ""} onClick={() => setViewMode("row")}>
            <FaBars />
          </button>
          <button className={viewMode === "grid" ? "active" : ""} onClick={() => setViewMode("grid")}>
            <FaThLarge />
          </button>
        </div>
      </div>

      <div className="browse-filters" ref={wrapperRef}>
        <div className="custom-dropdown">
          <button className="dropdown-toggle" onClick={() => setOpenDropdown(openDropdown === "gender" ? null : "gender")}>
            {genderFilter.charAt(0).toUpperCase() + genderFilter.slice(1)}
          </button>
          {openDropdown === "gender" && (
            <div className="dropdown-menu">
              {GENDERS.map((g) => (
                <div key={g} onClick={() => { setGenderFilter(g); setOpenDropdown(null); }} className="dropdown-item">
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="custom-dropdown">
          <button className="dropdown-toggle" onClick={() => setOpenDropdown(openDropdown === "interest" ? null : "interest")}>
            {interestFilter ? interestFilter : "All interests"}
          </button>
          {openDropdown === "interest" && (
            <div className="dropdown-menu">
              <div onClick={() => { setInterestFilter(""); setOpenDropdown(null); }} className="dropdown-item">
                All interests
              </div>
              {INTERESTS.map((i) => (
                <div key={i} onClick={() => { setInterestFilter(i); setOpenDropdown(null); }} className="dropdown-item">
                  {i.charAt(0).toUpperCase() + i.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="reset-btn" onClick={resetFilters} title="Reset filters">
          <FaRedo />
        </button>
      </div>

      {filteredUsers.length === 0 ? (
        <p className="no-results">No one matches these filters yet.</p>
      ) : (
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`browse-grid ${viewMode}`}
        >
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`browse-card ${viewMode}`}
              onClick={() => setSelectedUser(user)}
            >
              {likedIds.includes(user.id) && (
                <div className="liked-overlay">
                  <FaHeart color="#f43f5e" />
                </div>
              )}
              <img src={user.avatar} alt={user.name} className="browse-avatar" />
              <div className="browse-info">
                <h2>{user.name}</h2>
                <p>{user.bio}</p>
                <div className="tag-group">
                  {user.interests.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {selectedUser && (
        <PublicProfileDrawer
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            refreshLikes();
          }}
          onLikeChange={() => {
            localStorage.setItem("hasNewLikes", "true");
          }}
        />
      )}
    </div>
  );
}

export default Browse;
