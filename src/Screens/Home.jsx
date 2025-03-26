// Home.jsx (Enhanced with animations and better UX)
import { useEffect, useState } from "react";
import { users, events } from "../data/mockDB";
import { currentUserId } from "../data/CurrentUser";
import SwipeCard from "../Components/SwipeCard";
import EventCard from "../Components/EventCard";
import PublicProfileDrawer from "../Screens/PublicProfileDrawer";
import EventDrawer from "../Screens/EventDrawer";
import MiniProfile from "../Components/MiniProfile";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Home.css";

function Home() {
  const [queue, setQueue] = useState([]);
  const [person, setPerson] = useState(null);
  const [likedIds, setLikedIds] = useState([]);
  const [profileUser, setProfileUser] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [checkedInIds, setCheckedInIds] = useState([]);
  const [eventDrawer, setEventDrawer] = useState(null);

  useEffect(() => {
    const filtered = users.filter((u) => u.id !== currentUserId);
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setPerson(shuffled[0]);
    setLikedIds(JSON.parse(localStorage.getItem("likedUsers") || "[]"));
    setCheckedInIds(JSON.parse(localStorage.getItem("checkedInEvents") || "[]"));
    setEventList(events);
  }, []);

  const nextPerson = () => {
    const rest = queue.slice(1);
    setQueue(rest);
    setPerson(rest[0] || null);
  };

  const likePerson = () => {
    if (!person) return;
    const updated = [...likedIds, person.id];
    setLikedIds(updated);
    localStorage.setItem("likedUsers", JSON.stringify(updated));
    localStorage.setItem("hasNewLikes", "true");
    nextPerson();
  };

  const toggleCheckin = (eventId) => {
    const updated = checkedInIds.includes(eventId)
      ? checkedInIds.filter((id) => id !== eventId)
      : [...checkedInIds, eventId];
    setCheckedInIds(updated);
    localStorage.setItem("checkedInEvents", JSON.stringify(updated));
    localStorage.setItem("hasNewLikes", "true");
  };

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="home-section people">
  <h1 className="home-title">🔥 Today's Picks</h1>
  <div className="swipe-stack">
    {person ? (
      <SwipeCard
        user={person}
        onLike={likePerson}
        onPass={nextPerson}
        onProfileClick={setProfileUser}
      />
    ) : (
      <p className="no-more">You've seen everyone for now!</p>
    )}
  </div>
</div>


      {eventList.length > 0 && (
        <div className="spotlight-section">
          <h2 className="home-subtitle">🌟 Tonight’s Spotlight</h2>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <EventCard
              event={eventList[0]}
              checkedIn={checkedInIds.includes(eventList[0].id)}
              onClick={() => setEventDrawer(eventList[0])}
            />
          </motion.div>
        </div>
      )}

      <div className="home-section events">
        <h2 className="home-subtitle">🎉 Upcoming Events</h2>
        {eventList.length > 1 ? (
          <motion.div
            className="event-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {eventList.slice(1).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                checkedIn={checkedInIds.includes(event.id)}
                onClick={() => setEventDrawer(event)}
              />
            ))}
          </motion.div>
        ) : (
          <p className="no-events-text">No upcoming events right now. Check back soon!</p>
        )}
      </div>

      {profileUser && (
        <PublicProfileDrawer user={profileUser} onClose={() => setProfileUser(null)} />
      )}

      {eventDrawer && (
        <EventDrawer
          event={eventDrawer}
          checkedIn={checkedInIds.includes(eventDrawer.id)}
          onCheckin={() => toggleCheckin(eventDrawer.id)}
          onClose={() => setEventDrawer(null)}
        />
      )}
    </motion.div>
  );
}

export default Home;