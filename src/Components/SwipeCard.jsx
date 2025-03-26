import { useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/SwipeCard.css";

function SwipeCard({ user, onLike, onPass, onProfileClick }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwipe = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      direction === "left" ? onPass() : onLike();
    }, 300);
  };

  return (
    <div className="swipe-card-wrapper">
      <AnimatePresence mode="wait">
        {user && (
          <motion.div
            key={user.id}
            className="swipe-card"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SwipeCard;
