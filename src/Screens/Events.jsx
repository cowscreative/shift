import { useEffect, useState, useRef } from "react";
import { getUpcomingEvents } from "../data/dbUtils";
import EventCard from "../Components/EventCard";
import EventDrawer from "../Screens/EventDrawer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaRedo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Events.css";

function Events() {
  const [filter, setFilter] = useState("all");
  const [events, setEvents] = useState([]);
  const [eventDrawer, setEventDrawer] = useState(null);
  const [checkedInIds, setCheckedInIds] = useState(
    JSON.parse(localStorage.getItem("checkedInEvents") || "[]")
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const all = getUpcomingEvents();
    const tagFiltered = filter === "all" ? all : all.filter(e => e.tags.includes(filter));

    const dateFiltered = selectedDate
      ? tagFiltered.filter(e =>
          new Date(e.date).toDateString() === selectedDate.toDateString()
        )
      : tagFiltered;

    setEvents(dateFiltered);
  }, [filter, selectedDate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCheckin = (eventId) => {
    const updated = checkedInIds.includes(eventId)
      ? checkedInIds.filter(id => id !== eventId)
      : [...checkedInIds, eventId];

    setCheckedInIds(updated);
    localStorage.setItem("checkedInEvents", JSON.stringify(updated));
    localStorage.setItem("hasNewLikes", "true");
  };

  const resetFilters = () => {
    setSelectedDate(null);
    setFilter("all");
  };

  const highlightDatesSet = new Set(
    getUpcomingEvents().map((e) => new Date(e.date).toDateString())
  );

  const getHighlightDates = () => {
    return getUpcomingEvents().map((e) => new Date(e.date));
  };

  return (
    <motion.div className="events-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="events-title-row">
        <h1 className="events-title">🎉 All Events</h1>
        <div className="events-icons-wrapper">
          <button className="calendar-toggle" onClick={() => setShowCalendar(!showCalendar)}>
            <FaCalendarAlt />
          </button>
          <button className="reset-toggle" onClick={resetFilters}>
            <FaRedo />
          </button>

          <AnimatePresence>
            {showCalendar && (
              <motion.div
                className="calendar-popover"
                ref={calendarRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Pick a date"
                  className="date-input"
                  isClearable
                  inline
                  highlightDates={getHighlightDates()}
                  dayClassName={(date) =>
                    highlightDatesSet.has(date.toDateString()) ? "highlighted-day" : undefined
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div className="event-tags" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {["all", "music", "outdoors", "casual", "social", "creative"].map(tag => (
          <button
            key={tag}
            className={`filter-tag ${filter === tag ? "active" : ""}`}
            onClick={() => setFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      <motion.div className="event-list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        {events.length === 0 ? (
          <p className="no-events">No events match your filters.</p>
        ) : (
          events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              checkedIn={checkedInIds.includes(event.id)}
              onClick={() => setEventDrawer(event)}
            />
          ))
        )}
      </motion.div>

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

export default Events;