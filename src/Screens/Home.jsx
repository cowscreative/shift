import { useEffect, useState } from "react";
import { users } from "../data/mockDB";
import { events } from "../data/updatedEvents";
import { currentUserId } from "../data/CurrentUser";
import SwipeCard from "../Components/SwipeCard";
import EventCard from "../Components/EventCard";
import PublicProfileDrawer from "../Screens/PublicProfileDrawer";
import EventDrawer from "../Screens/EventDrawer";
import MiniProfile from "../Components/MiniProfile";
import "../styles/Home.css";

function Home() {
  const [queue, setQueue] = useState([]);
  const [person, setPerson] = useState(null);
  const [likedIds, setLikedIds] = useState([]);
  const [profileUser, setProfileUser] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [checkedInIds, setCheckedInIds] = useState([]);
  const [eventDrawer, setEventDrawer] = useState(null);
  const [featuredMembers, setFeaturedMembers] = useState([]);

  useEffect(() => {
    const filteredUsers = users.filter((u) => u.id !== currentUserId);
    const shuffledUsers = filteredUsers.sort(() => Math.random() - 0.5);
    setQueue(shuffledUsers);
    setPerson(shuffledUsers[0]);
    setFeaturedMembers(shuffledUsers.slice(0, 10));
    setLikedIds(JSON.parse(localStorage.getItem("likedUsers") || "[]"));
    setCheckedInIds(JSON.parse(localStorage.getItem("checkedInEvents") || "[]"));

    const now = new Date();
    const futureEvents = events
      .filter((e) => e.start && new Date(e.start) > now)
      .sort((a, b) => (b.capacity || 0) - (a.capacity || 0));
    setEventList(futureEvents);
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

  const spotlightEvent = eventList.find((e) => e.capacity > 0);
  const upcomingEvents = eventList.filter((e) => e.capacity > 0).slice(1, 11);

  const categories = [
    { label: "Comedy", slug: "comedy", emoji: "🎤" },
    { label: "Live Music", slug: "live-music", emoji: "🎸" },
    { label: "DJ & Parties", slug: "dj-s-parties", emoji: "🎧" },
    { label: "Food & Drink", slug: "food-drink", emoji: "🍸" },
    { label: "Fitness & Health", slug: "fitness-health", emoji: "💪" },
    { label: "Drag", slug: "drag", emoji: "💄" },
    { label: "Free", slug: "free", emoji: "🆓" },
    { label: "Exhibit", slug: "exhibit", emoji: "🖼️" },
    { label: "Sports", slug: "sports-activities", emoji: "🏀" },
    { label: "Community", slug: "community-local", emoji: "🏡" },
    { label: "Variety", slug: "variety-other", emoji: "🌀" },
    { label: "LGBTQ+", slug: "lgbtq", emoji: "🏳️‍🌈" }
  ];

  const featuredCategories = ["comedy", "live-music", "fitness-health", "free"];

  const getEventsForCategory = (slug) => {
    const now = new Date();
    return eventList
      .filter(
        (e) =>
          e.capacity > 0 &&
          new Date(e.start) > now &&
          (e.category === slug || e.tags?.includes(slug))
      )
      .slice(0, 10);
  };

  return (
    <div className="home-container">
      <div className="home-section people">
        <h1 className="home-title">Meet someone new</h1>
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

      {spotlightEvent && (
        <div className="spotlight-section">
          <h2 className="home-subtitle">Spotlight Event</h2>
          <EventCard
            event={spotlightEvent}
            checkedIn={checkedInIds.includes(spotlightEvent.id)}
            onClick={() => setEventDrawer(spotlightEvent)}
          />
        </div>
      )}


    {featuredMembers.length > 0 && (
        <div className="home-section featured-members">
          <h2 className="home-subtitle">🌟 Featured Members</h2>
          <div className="profile-scroll">
            {featuredMembers.map((user) => (
              <div
                key={user.id}
                className="profile-circle"
                onClick={() => setProfileUser(user)}
              >
                <img src={user.avatar} alt={user.name} className="avatar-img" />
                <span className="avatar-name">{user.name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {upcomingEvents.length > 0 && (
        <div className="home-section events">
          <h2 className="home-subtitle">Popular Events</h2>
          <div className="event-scroll">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                checkedIn={checkedInIds.includes(event.id)}
                onClick={() => setEventDrawer(event)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="home-section categories">
        <h2 className="home-subtitle">Explore by Category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/cactus/events?category=${cat.slug}`}
              className="category-block"
            >
              <div className="emoji">{cat.emoji}</div>
              <div className="label">{cat.label}</div>
            </a>
          ))}
        </div>
      </div>

      {featuredCategories.map((slug) => {
        const matchingCategory = categories.find((c) => c.slug === slug);
        const label = matchingCategory?.label || slug;
        const events = getEventsForCategory(slug);

        return (
          events.length > 0 && (
            <div className="home-section events" key={slug}>
              <div className="home-subtitle-row">
                <h2 className="home-subtitle">{label} Events</h2>
                <a
                  className="view-all-link"
                  href={`/cactus/events?category=${slug}`}
                >
                  → View all {label.toLowerCase()} events
                </a>
              </div>

              <div className="event-scroll">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    checkedIn={checkedInIds.includes(event.id)}
                    onClick={() => setEventDrawer(event)}
                  />
                ))}
              </div>
            </div>
          )
        );
      })}

      <div className="cactus-footer">
        <p className="footer-cactus-text">Welcome to the club</p>
        <img
          src="https://cows.host/cactus/img/cactus-loader.png"
          alt="Don't be a prick"
          className="footer-cactus-img"
        />
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
    </div>
  );
}

export default Home;
