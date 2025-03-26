import { useEffect, useState, useRef } from "react";
import { events as allEvents } from "../data/updatedEvents"; // use your new local file
import EventCard from "../Components/EventCard";
import EventDrawer from "../Screens/EventDrawer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaRedo } from "react-icons/fa";
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
    const filtered = allEvents.filter((event) => {
      const eventDate = new Date(event.date).toDateString();
      const matchFilter =
        filter === "all" || event.tags?.includes(filter) || event.category === filter;
      const matchDate =
        !selectedDate ||
        new Date(event.date).toDateString() === selectedDate.toDateString();
      return matchFilter && matchDate;
    });
    setEvents(filtered);
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
      ? checkedInIds.filter((id) => id !== eventId)
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
    allEvents
      .filter((e) => new Date(e.date) >= new Date())
      .map((e) => new Date(e.date).toDateString())
  );

  const getHighlightDates = () => {
    return allEvents
      .filter((e) => new Date(e.date) >= new Date())
      .map((e) => new Date(e.date));
  };

  return (
    <div className="events-container">
      <div className="events-title-row">
        <h1 className="events-title">🎉 All Events</h1>
        <div className="events-icons-wrapper">
          <button
            className="calendar-toggle"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <FaCalendarAlt />
          </button>
          <button className="reset-toggle" onClick={resetFilters}>
            <FaRedo />
          </button>

          {showCalendar && (
            <div className="calendar-popover" ref={calendarRef}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Pick a date"
                className="date-input"
                isClearable
                inline
                highlightDates={getHighlightDates()}
                dayClassName={(date) =>
                  highlightDatesSet.has(date.toDateString())
                    ? "highlighted-day"
                    : undefined
                }
              />
            </div>
          )}
        </div>
      </div>

      <div className="event-tags">
        {["all", "comedy", "live-music", "dj-s-parties", "food-drink", "fitness-health", "drag", "free", "exhibit", "sports-activities", "community-local", "variety-other", "lgbtq"].map(
          (tag) => (
            <button
              key={tag}
              className={`filter-tag ${filter === tag ? "active" : ""}`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          )
        )}
      </div>

      <div className="event-list">
        {events.length === 0 ? (
          <p className="no-events">No events match your filters.</p>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              checkedIn={checkedInIds.includes(event.id)}
              onClick={() => setEventDrawer(event)}
            />
          ))
        )}
      </div>

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

export default Events;
