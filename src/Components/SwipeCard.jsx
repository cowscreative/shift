import { useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import "../styles/SwipeCard.css";

function SwipeCard({ user, onLike, onPass, onProfileClick }) {
  const [swipeClass, setSwipeClass] = useState("");

  const handleSwipe = (direction) => {
    if (swipeClass) return;

    const className = direction === "left" ? "swipe-left" : "swipe-right";
    setSwipeClass(className);

    setTimeout(() => {
      setSwipeClass("");
      direction === "left" ? onPass() : onLike();
    }, 300);
  };

  if (!user) return null;

  return (
    <div className="swipe-card-wrapper">
      <div className={`swipe-card ${swipeClass}`}>
        <img
          src={user.avatar}
          alt={user.name}
          className="swipe-avatar"
          onClick={() => onProfileClick(user)}
        />
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
        <div className="swipe-buttons">
          <button className="pass-btn" onClick={() => handleSwipe("left")}>
            <FaTimes />
          </button>
          <button className="like-btn" onClick={() => handleSwipe("right")}>
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwipeCard;
