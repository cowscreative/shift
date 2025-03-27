import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/PublicProfileDrawer.css";

function PublicProfileDrawer({ user, onClose, onLikeChange }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("likedUsers") || "[]");
    setLiked(saved.includes(user.id));
  }, [user.id]);

  const toggleLike = () => {
    const saved = JSON.parse(localStorage.getItem("likedUsers") || "[]");
    let updated;

    if (liked) {
      updated = saved.filter((id) => id !== user.id);
    } else {
      updated = [...saved, user.id];
      localStorage.setItem("hasNewLikes", "true");
    }

    localStorage.setItem("likedUsers", JSON.stringify(updated));
    setLiked(!liked);
    if (onLikeChange) onLikeChange();
  };

  if (!user) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
      <div className="drawer-header">
          <button className="icon-btn" onClick={onClose}>
            <IoCloseOutline size={26} />
          </button>
        </div>
        <div className="profile-header">
          <img src={user.avatar} alt={user.name} className="drawer-avatar" />
          <div className="header-text">
            <h2>{user.name}, {user.age}</h2>
            <p className="gender-subtext">
              {user.gender} {user.interestedIn?.length > 0 && `• likes ${user.interestedIn.join(", ")}`}
            </p>
          </div>
          <button className="like-btn" onClick={toggleLike}>
            {liked ? <FaHeart size={20} color="#FF4D6D" /> : <FaRegHeart size={20} />}
          </button>
        </div>

        <div className="drawer-content">
          <div className="section">
            <h3>About</h3>
            <p>{user.bio || "This person hasn’t written a bio yet."}</p>
          </div>

          <div className="section">
            <h3>Interests</h3>
            <div className="tag-group">
              {user.interests.map((tag) => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="section">
            <h3>More Info</h3>
            <ul className="details-list">
              <li>📍 Lives in {user.neighborhood}</li>
              <li>🎯 Looking for {user.lookingFor}</li>
              <li>📅 Joined {new Date(user.createdAt).toLocaleDateString()}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfileDrawer;
