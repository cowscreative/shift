import { IoCloseOutline } from "react-icons/io5";
import "../styles/EventDrawer.css";

function EventDrawer({ event, checkedIn, onCheckin, onClose }) {
  if (!event) return null;

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

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
          <h2 className="event-title">{event.title}</h2>
          {event.byline && <p className="event-byline">{event.byline}</p>}

          <div className="drawer-actions">
            <button
              className={`checkin-btn ${checkedIn ? "checked" : ""}`}
              onClick={onCheckin}
            >
              {checkedIn ? "✅ Checked In" : "📍 Check In"}
            </button>
            {event.url && (
              <a
                className="event-link"
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Event →
              </a>
            )}
          </div>

          <p className="event-date">{formattedDate}</p>
          <div className="event-details">
            <ul className="details-list">
              {event.venue && <li>📍 Venue: {event.venue}</li>}
              {event.address && <li>🗺️ Address: {event.address}</li>}
              {event.attendees && (
                <li>👥 Attendees: {event.attendees.length}</li>
              )}
              {event.tickets && (
                <li>🎟️ Tickets: {event.tickets}</li>
              )}
            </ul>
            {event.description && <p>{event.description}</p>}
          </div>

          <div className="tag-group">
            {event.category && <span className="tag">{event.category}</span>}
            {event.tags && event.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDrawer;
