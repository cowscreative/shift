import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { workoutFilters, workouts as allWorkouts } from "/src/data/workouts";
import "/src/styles/Workouts.css";

function Workouts() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const filterFromURL = queryParams.get("filter") || "All";

    const [selectedFilter, setSelectedFilter] = useState(filterFromURL);
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    useEffect(() => {
        setSelectedFilter(filterFromURL);
    }, [filterFromURL]);

    const closeModal = () => setSelectedWorkout(null);

    const handleOutsideClick = (event) => {
        if (event.target.classList.contains("modal-overlay")) {
            closeModal();
        }
    };

    const filteredWorkouts = selectedFilter === "All"
        ? allWorkouts
        : allWorkouts.filter(workout => workout.tags.includes(selectedFilter));

    const handleStartWorkout = () => {
        navigate(`/start-workout?filter=${encodeURIComponent(selectedFilter)}`);
    };

    return (
        <motion.div
            className="workouts-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <h2>💪 Choose Your Workout</h2>

            <div className="filter-container">
                {workoutFilters.map((filter) => (
                    <button
                        key={filter}
                        className={`filter-pill ${selectedFilter === filter ? "active" : ""}`}
                        onClick={() => setSelectedFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <motion.div
                className="workouts-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                {filteredWorkouts.map((workout, index) => (
                    <motion.div
                        key={index}
                        className="workout-item"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedWorkout(workout)}
                    >
                        <div className="workout-info">
                            <h2>{workout.name}</h2>
                            <p className="workout-details">
                                {`${workout.weight} lbs • ${workout.reps} reps • ${workout.rounds} rounds`}
                            </p>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${workout.progress}%` }}
                            ></div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Start Workout Button */}
                <button className="save-btn" onClick={handleStartWorkout}>
                    Start Workout
                </button>

            {/* Workout Modal */}
            <AnimatePresence>
                {selectedWorkout && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleOutsideClick}
                    >
                        <motion.div 
                            className="workout-bottom-sheet"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 100 }}
                            dragElastic={0.2}
                            onDragEnd={(event, info) => {
                                if (info.offset.y > 100) closeModal();
                            }}
                        >
                            <div className="modal-header">
                                <button className="close-btn" onClick={closeModal}>✕</button>
                            </div>
                            <div className="workout-sheet-content">
                                <h2>{selectedWorkout.name}</h2>
                                <p><strong>Category:</strong> {selectedWorkout.category}</p>
                                <p><strong>Tags:</strong> {selectedWorkout.tags.join(", ")}</p>
                                <p><strong>Weight:</strong> {selectedWorkout.weight} lbs</p>
                                <p><strong>Reps:</strong> {selectedWorkout.reps}</p>
                                <p><strong>Rounds:</strong> {selectedWorkout.rounds}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Workouts;
