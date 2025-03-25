import { useState } from "react";
import { motion } from "framer-motion";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { clearWorkoutLogs } from "/src/utils/storage.js";
import "/src/styles/Profile.css";

function Profile() {
    const [user] = useState({
        email: "gibson@cowscreative.com",
        user_metadata: {
            name: "Gibson",
            avatar_url: "./img/profile.png"
        }
    });

    const navigate = useNavigate();

    return (
        <motion.div 
            className="profile-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <h1>Howdy {user.user_metadata?.name}</h1>

            <motion.header className="profile-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <motion.img 
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    className="profile-pic"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                />
                <p>{user.email}</p>
            </motion.header>

            <motion.div 
                className="profile-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <motion.button 
                    className="profile-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/settings")}
                >
                    <IoSettingsOutline className="action-icon" />
                    Settings
                </motion.button>

                <motion.button 
                    className="profile-btn logout"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert("Logout is disabled in dev mode")}
                >
                    <IoLogOutOutline className="action-icon" />
                    Logout
                </motion.button>

                <motion.button 
                    className="profile-btn danger"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        if (confirm("Are you sure you want to clear all stats? This cannot be undone.")) {
                            clearWorkoutLogs();
                            alert("Stats cleared!");
                            window.location.reload();
                        }
                    }}
                >
                    🗑️ Clear Stats
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default Profile;