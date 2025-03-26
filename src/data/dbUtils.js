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
