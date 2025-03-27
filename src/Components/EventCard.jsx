import "./EventCard.css";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function EventCard({ event, checkedIn, onClick }) {
  return (
    <div
      className={`event-card ${checkedIn ? "checked-in" : ""}`}
      onClick={() => onClick(event)}
    >
      <img src={event.image} alt={event.title} className="event-img" />

      <div className="event-info">
        <div className="event-title-row">
          <h3 className="event-title">{event.title}</h3>
          <span className="event-date">{formatDate(event.date)}</span>
        </div>

        <div className="event-tags-row">
          {event.tags.map((tag) => (
            <span className="chip" key={tag}>
              {tag.replace(/-/g, " ")}
            </span>
          ))}
          {typeof event.capacity === "number" && event.capacity > 0 && (
            <span className="going">{event.capacity} going</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
