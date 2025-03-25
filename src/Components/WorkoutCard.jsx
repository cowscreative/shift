function WorkoutCard({ workout }) {
    return (
        <div style={{ background: "white", padding: "15px", margin: "10px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h3>{workout.name}</h3>
            <p>🔥 {workout.calories} Calories</p>
            <p>⏳ {workout.duration} mins</p>
        </div>
    );
}

export default WorkoutCard;
