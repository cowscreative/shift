import { useEffect, useState } from "react";
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

  useEffect(() => {
    refreshLikes();
  }, []);

  useEffect(() => {
    let result = users.filter((u) => u.id !== currentUserId);
    if (genderFilter !== "all") result = result.filter((u) => u.gender === genderFilter);
    if (interestFilter !== "") result = result.filter((u) => u.interests.includes(interestFilter));
    setFilteredUsers(result);
  }, [genderFilter, interestFilter]);

  useEffect(() => {
    localStorage.setItem("genderFilter", genderFilter);
    localStorage.setItem("interestFilter", interestFilter);
    localStorage.setItem("viewMode", viewMode);
  }, [genderFilter, interestFilter, viewMode]);

  const refreshLikes = () => {
    const updated = JSON.parse(localStorage.getItem("likedUsers") || "[]");
    setLikedIds(updated);
  };

  const resetFilters = () => {
    setGenderFilter("all");
    setInterestFilter("");
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

      <div className="browse-filters">
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={interestFilter} onChange={(e) => setInterestFilter(e.target.value)}>
          <option value="">All interests</option>
          {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
        <button className="reset-btn" onClick={resetFilters}>
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
                <h2>{user.name}, {user.age}</h2>
                <p>{/*user.bio*/}</p>
                <p className="extra-info">
                  {user.neighborhood} • {user.lookingFor}
                </p>
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
