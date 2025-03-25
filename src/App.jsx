import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./Screens/Home";
import Workouts from "./Screens/Workouts";
import Stats from "./Screens/Stats";
import Profile from "./Screens/Profile";
import Settings from "./Screens/Settings";
import WorkoutSession from "./Screens/WorkoutSession"; // <-- Add this line
import BottomNav from "./UI/BottomNav";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import { IoChevronBackOutline, IoSettingsOutline } from "react-icons/io5";
import "/src/styles/App.css";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const showBackButton = location.pathname !== "/";

    return (
        <header className="app-header">
            {showBackButton ? (
                <button className="header-btn back-btn" onClick={() => navigate(-1)}>
                    <IoChevronBackOutline />
                </button>
            ) : (
                <div className="header-placeholder"></div>
            )}
            <h1 className="app-logo" onClick={() => navigate("/")}>Workout</h1>
            <button className="header-btn settings-btn" onClick={() => navigate("/settings")}>
                <IoSettingsOutline />
            </button>
        </header>
    );
}

function App() {
    useEffect(() => {
        const hour = new Date().getHours();
        const autoDark = hour < 6 || hour >= 18;

        const stored = localStorage.getItem("darkMode");
        const isDark = stored === null ? autoDark : stored === "true";

        document.body.classList.toggle("dark", isDark);
    }, []);

    return (
        <>
            <Header />
            <ScrollToTop />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/workouts" element={<Workouts />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/start-workout" element={<WorkoutSession />} />
                </Routes>
            </div>
            <BottomNav />
        </>
    );
}

export default App;