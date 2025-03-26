import { users, events, likes, matches, messages, checkins } from "./mockDB.js";

// Get a user by ID
export function getUserById(id) {
  return users.find(u => u.id === id);
}

// Get upcoming events
export function getUpcomingEvents() {
  const now = new Date();
  return events.filter(event => new Date(event.date) > now);
}

// Get a user's likes
export function getUserLikes(userId) {
  return likes.filter(like => like.from === userId);
}

// Get mutual matches for a user
export function getUserMatches(userId) {
  return matches
    .filter(match => match.users.includes(userId))
    .map(match => {
      const otherId = match.users.find(id => id !== userId);
      return getUserById(otherId);
    });
}

// Get messages between two users
export function getMessagesBetween(user1, user2) {
  return messages.filter(
    msg =>
      (msg.sender === user1 && msg.receiver === user2) ||
      (msg.sender === user2 && msg.receiver === user1)
  );
}

// Get events a user is attending
export function getUserEvents(userId) {
  return events.filter(e => e.attendees.includes(userId));
}

export function getFilteredEvents({ filter = "all", selectedDate = null }) {
    const now = new Date();
    const all = getUpcomingEvents().filter(e => new Date(e.date) >= now);
  
    const tagFiltered = filter === "all" ? all : all.filter(e => e.tags.includes(filter));
  
    const dateFiltered = selectedDate
      ? tagFiltered.filter(e =>
          new Date(e.date).toDateString() === selectedDate.toDateString()
        )
      : tagFiltered;
  
    return dateFiltered;
  }

  // src/utils/fetchEventsFromCSV.js
export async function fetchEventsFromCSV() {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ47wjQVQnTTQmUnVWG-lkKt8hnbh88umNtL73uKas8GP1MfaWloLpmFS6wtUmnG9hpFd9xubqKHMMw/pub?output=csv";
  const res = await fetch(url);
  const text = await res.text();
  const rows = text.split("\n").slice(1).filter(Boolean); // skip header
  return rows.map((row, idx) => {
    const [
      date, title, url, image, venue, address, time, start, end,
      attendees, upvotes, category, tickets, byline, series
    ] = row.split(",");

    return {
      id: `event_${idx}`,
      date: new Date(date).toISOString(),
      title,
      url,
      image,
      location: {
        name: venue,
        address,
      },
      time,
      start,
      end,
      attendees: attendees?.split(";") || [],
      upvotes: parseInt(upvotes) || 0,
      category: category?.toLowerCase() || "casual",
      tags: [category?.toLowerCase() || "casual"],
      tickets,
      byline,
      series,
      description: byline || "", // temp
    };
  });
}

  