// src/Screens/Stats.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getWorkoutLogs } from "../utils/storage.js";
import "/src/styles/Stats.css";

function formatDate(dateString) {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function getWorkoutLabel(log) {
    const categories = new Set();
    log.forEach(exercise => {
        exercise.sets.forEach(() => {
            const match = exercise.name.toLowerCase();
            if (match.includes("press") || match.includes("tricep") || match.includes("chest")) {
                categories.add("Push");
            } else if (match.includes("row") || match.includes("curl") || match.includes("pull")) {
                categories.add("Pull");
            } else if (match.includes("squat") || match.includes("leg") || match.includes("lunge")) {
                categories.add("Legs");
            } else if (match.includes("core") || match.includes("abs") || match.includes("bicycle")) {
                categories.add("Core");
            } else {
                categories.add("Full Body");
            }
        });
    });
    return [...categories].join(", ");
}

function Stats() {
    const [logs, setLogs] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const storedLogs = getWorkoutLogs();
        setLogs(storedLogs);
    }, []);

    const logEntries = Object.entries(logs).sort(([a], [b]) => new Date(b) - new Date(a));

    const partiallyCompletedExercises = logEntries.reduce((total, [, exercises]) => {
        exercises.forEach(ex => {
            const hasCompletedSet = ex.sets.some(set => set.completed);
            if (hasCompletedSet) total += 1;
        });
        return total;
    }, 0);

    const totalWeightLifted = logEntries.reduce((total, [, exercises]) => {
        exercises.forEach(ex => {
            ex.sets.forEach(set => {
                if (set.completed) {
                    const weight = parseFloat(set.weight);
                    const reps = parseInt(set.reps);
                    if (!isNaN(weight) && !isNaN(reps)) {
                        total += weight * reps;
                    }
                }
            });
        });
        return total;
    }, 0);

    const stats = {
        workoutsCompleted: partiallyCompletedExercises,
        totalWeight: totalWeightLifted,
    };

    return (
        <motion.div
            className="stats-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <motion.header className="stats-header">
                <h1>📊 Workout Stats</h1>
                <p>Track your progress & stay motivated!</p>
            </motion.header>

            <motion.div className="stats-overview">
                <motion.div className="stats-card" whileHover={{ scale: 1.05 }}>
                    <h2>{stats.workoutsCompleted}</h2>
                    <p>Workouts Completed</p>
                </motion.div>
                <motion.div className="stats-card" whileHover={{ scale: 1.05 }}>
                    <h2>{stats.totalWeight.toLocaleString()} lbs</h2>
                    <p>Total Weight Lifted</p>
                </motion.div>
            </motion.div>

            <motion.section className="log-history">
                <h2>📅 Recent Workouts</h2>
                {logEntries.length === 0 ? (
                    <p>No saved workouts yet.</p>
                ) : (
                    logEntries.map(([timestamp, log]) => (
                        <motion.div
                            key={timestamp}
                            className="log-entry"
                            onClick={() => setSelectedDate(timestamp)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <strong>{formatDate(timestamp)}</strong> – {getWorkoutLabel(log)} ({log.length} exercises)
                        </motion.div>
                    ))
                )}
            </motion.section>

            <AnimatePresence>
                {selectedDate && (
                    <motion.div
                        className="log-drawer-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedDate(null)}
                    >
                        <motion.div
                            className="log-drawer"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button className="close-btn" onClick={() => setSelectedDate(null)}>✕</button>
                            <h2>🗓️ {formatDate(selectedDate)}</h2>
                            {logs[selectedDate]?.filter(ex => ex.sets.some(s => s.completed)).map((exercise, i) => (
                                <div key={i} className="log-exercise">
                                    <h3>{exercise.name}</h3>
                                    {exercise.sets.map((set, j) =>
                                        set.completed ? (
                                            <p key={j}>
                                                ✅ Set {j + 1}: {set.weight} – {set.reps} reps
                                            </p>
                                        ) : null
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Stats;
