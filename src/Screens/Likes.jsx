import { useEffect, useState } from "react";
import { users } from "../data/mockDB";
import { events } from "../data/updatedEvents";
import EventDrawer from "../Screens/EventDrawer";
import PublicProfileDrawer from "../Screens/PublicProfileDrawer";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Likes.css";

function Likes() {
  const [likedUsers, setLikedUsers] = useState([]);
  const [checkedEvents, setCheckedEvents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [eventDrawer, setEventDrawer] = useState(null);

  useEffect(() => {
    refreshData();
    localStorage.removeItem("hasNewLikes");
  }, []);

  const refreshData = () => {
    const savedLikes = JSON.parse(localStorage.getItem("likedUsers") || "[]");
    const savedEvents = JSON.parse(localStorage.getItem("checkedInEvents") || "[]");

    setLikedUsers(users.filter((u) => savedLikes.includes(u.id)));
    setCheckedEvents(events.filter((e) => savedEvents.includes(e.id)));
  };

  const unlikeUser = (id) => {
    const updated = likedUsers.filter((u) => u.id !== id);
    setLikedUsers(updated);
    localStorage.setItem("likedUsers", JSON.stringify(updated.map((u) => u.id)));
    if (selectedUser?.id === id) setSelectedUser(null);
  };

  const toggleCheckin = (eventId) => {
    const saved = JSON.parse(localStorage.getItem("checkedInEvents") || "[]");
    const updated = saved.includes(eventId)
      ? saved.filter((id) => id !== eventId)
      : [...saved, eventId];

    localStorage.setItem("checkedInEvents", JSON.stringify(updated));
    setCheckedEvents(events.filter((e) => updated.includes(e.id)));
  };

  return (
    <div className="likes-container">
      <motion.h1
        className="likes-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        ❤️ People You’ve Liked
      </motion.h1>

      <AnimatePresence>
        {likedUsers.length === 0 ? (
          <motion.p
            className="no-matches"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No likes yet. Swipe right to start!
          </motion.p>
        ) : (
          <motion.div
            className="match-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {likedUsers.map((user) => (
              <motion.div
                key={user.id}
                className="match-card"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedUser(user)}
              >
                <img src={user.avatar} alt={user.name} className="match-avatar" />
                <div className="match-info">
                  <h2>{user.name}</h2>
                  <p>{user.bio}</p>
                </div>
                <button
                  className="unlike-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    unlikeUser(user.id);
                  }}
                >
                  💔
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h2
        className="likes-subtitle"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        📍 Events You’re Going To
      </motion.h2>

      <AnimatePresence>
        {checkedEvents.length === 0 ? (
          <motion.p
            className="no-matches"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            You haven’t checked into any events yet.
          </motion.p>
        ) : (
          <motion.div
            className="event-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {checkedEvents.map((event) => (
              <motion.div
                key={event.id}
                className="event-card"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setEventDrawer(event)}
              >
                <img src={event.image} alt={event.title} className="event-img" />
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p>
                    {new Date(event.date).toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {selectedUser && (
        <PublicProfileDrawer
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {eventDrawer && (
        <EventDrawer
          event={eventDrawer}
          checkedIn={checkedEvents.some((e) => e.id === eventDrawer.id)}
          onCheckin={() => {
            toggleCheckin(eventDrawer.id);
            refreshData();
          }}
          onClose={() => {
            setEventDrawer(null);
            refreshData();
          }}
        />
      )}
    </div>
  );
}

export default Likes;
