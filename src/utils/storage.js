// src/utils/storage.js

const STORAGE_KEY = "workout_logs";

export function saveWorkoutLog(date, data) {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const timestamp = new Date().toISOString(); // e.g., 2024-05-01T18:34:00.000Z
    existing[timestamp] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getWorkoutLogs() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

export function clearWorkoutLogs() {
    localStorage.removeItem(STORAGE_KEY);
}
