// src/Components/EventPill.jsx
//import "../styles/EventPill.css";

function EventPill({ event, checkedIn, onClick }) {
  return (
    <div
      className={`event-pill ${checkedIn ? "checked-in" : ""}`}
      onClick={() => onClick(event)}
    >
      <img src={event.image} alt={event.title} />
      <span>{event.title}</span>
    </div>
  );
}

export default EventPill;