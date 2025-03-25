// src/Screens/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "../Components/AppButton";
import { IoBarbellOutline, IoFitnessOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { getRandomChallenge } from "../data/workouts.js";
import "react-circular-progressbar/dist/styles.css";
import "/src/styles/Home.css";

const dailyChallenge = getRandomChallenge();

function Home() {
    const navigate = useNavigate();
    const [greeting, setGreeting] = useState("");
    const [quote, setQuote] = useState("");
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning! ☀️");
        else if (hour < 18) setGreeting("Good afternoon! 🌤️");
        else setGreeting("Good evening! 🌙");

        const quotes = [
            "Push yourself, because no one else will do it for you.",
            "Sweat today, shine tomorrow.",
            "Your body can stand almost anything, it's your mind you have to convince.",
            "Stronger every day."
        ];
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

        const lime = getComputedStyle(document.documentElement).getPropertyValue("--color-lime").trim();

        setWorkouts([
            { name: "Push", color: lime, filter: "Push" },
            { name: "Pull", color: lime, filter: "Pull" },
            { name: "Legs", color: lime, filter: "Legs" },
            { name: "Full Body", color: lime, filter: "Full Body" }
        ]);
    }, []);

    return (
        <motion.div 
            className="home-container"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* Greeting */}
            <header className="home-header">
                <h1>{greeting}</h1>
                <p>{quote}</p>
            </header>

            {/* Daily Challenge */}
            <section className="daily-challenge">
                <h2>💪 Daily Challenge</h2>
                <p>{dailyChallenge}</p>
            </section>

            {/* Workout Type Grid */}
            <motion.section 
                className="workout-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                {workouts.map((workout, index) => (
                    <motion.div 
                        key={index} 
                        className="workout-card"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ backgroundColor: workout.color }}
                        onClick={() => navigate(`/workouts?filter=${encodeURIComponent(workout.filter)}`)}
                    >
                        <h2>{workout.name}</h2>
                    </motion.div>
                ))}
            </motion.section>

            {/* Action Buttons */}
            <motion.div 
                className="quick-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <AppButton className="action-btn" onClick={() => navigate("/workouts")}>
                    <IoFitnessOutline className="action-icon" />
                    Start Workout
                </AppButton>
                <AppButton className="action-btn secondary" onClick={() => navigate("/stats")}>
                    <IoBarbellOutline className="action-icon" />
                    View Stats
                </AppButton>
            </motion.div>
        </motion.div>
    );
}

export default Home;