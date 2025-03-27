import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import "../styles/EventDrawer.css";

function EventDrawer({ event, checkedIn, onCheckin, onClose }) {
  if (!event) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const attendeeCount = parseInt(event.attendees);
  const showAttendees = !isNaN(attendeeCount) && attendeeCount > 0;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <button className="icon-btn" onClick={onClose}>
            <IoCloseOutline size={26} />
          </button>
        </div>

        {event.image && (
          <img src={event.image} alt={event.title} className="drawer-image" />
        )}

        <div className="drawer-content">
        <div className="event-header-row">
          <div className="event-header-left">
            <h2 className="event-title">{event.title}</h2>
            <p className="event-date">{formattedDate}</p>
          </div>
          <button
            className={`checkin-btn ${checkedIn ? "checked" : ""}`}
            onClick={onCheckin}
          >
            {checkedIn ? "I'm not going anymore" : "📍 I'm going"}
          </button>
        </div>

          <div className="event-details">
            <ul className="details-list">
              {event.venue && <li>📍 Venue: {event.venue}</li>}
              {event.address && <li>🗺️ Address: {event.address}</li>}
              {showAttendees && <li>👥 Attendees: {attendeeCount}</li>}
            </ul>
          </div>

          <div className="tag-group">
            {event.tags?.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          {event.url && (
            <div className="drawer-actions" style={{ marginTop: "2rem" }}>
              <a
                className="event-link"
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Event →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDrawer;
