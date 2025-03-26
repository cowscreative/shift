// src/drawers/EventDrawer.jsx
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

        <img src={event.image} alt={event.title} className="drawer-image" />

        <div className="drawer-content">
          <h2 className="event-title">{event.title}</h2>
          <p className="event-date">{formattedDate}</p>

          <div className="tag-group">
            {event.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>

          <div className="event-details">
            <p>{event.description}</p>
            <ul className="details-list">
              <li>📍 Location: {event.location.name}</li>
              <li>👥 Attendees: {event.attendees?.length || 0}</li>
            </ul>
          </div>

          <div className="drawer-actions">
            <button
              className={`checkin-btn ${checkedIn ? "checked" : ""}`}
              onClick={onCheckin}
            >
              {checkedIn ? "✅ Checked In" : "📍 Check In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDrawer;
