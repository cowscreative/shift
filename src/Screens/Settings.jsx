import { useState } from "react";
import "/src/styles/Settings.css";

function Settings() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
      );
      const toggleDarkMode = () => {
        const newValue = !darkMode;
        setDarkMode(newValue);
        localStorage.setItem("darkMode", newValue);
        document.body.classList.toggle("dark", newValue);
      };
      
    return (
        <div className="settings-container">
            <h2>⚙️ Settings</h2>

            {/* App Preferences Section */}
            <div className="settings-section">
                <h3>App Preferences</h3>
                <ul className="settings-list">
                    <li>
                        <span>Dark Mode</span>
                        <label className="toggle-switch">
                        <input 
                            type="checkbox" 
                            checked={darkMode} 
                            onChange={toggleDarkMode}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </li>
                    <li>
                        <span>Notifications</span>
                        <label className="toggle-switch">
                            <input 
                                type="checkbox" 
                                checked={notifications} 
                                onChange={() => setNotifications(!notifications)} 
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </li>
                </ul>
            </div>

            {/* Account Section */}
            <div className="settings-section">
                <h3>Account</h3>
                <ul className="settings-list">
                    <li><span>Manage Profile</span></li>
                    <li><span>Privacy Settings</span></li>
                </ul>
            </div>

            {/* Support Section */}
            <div className="settings-section">
                <h3>Support</h3>
                <ul className="settings-list">
                    <li><span>Help Center</span></li>
                    <li><span>Feedback</span></li>
                </ul>
            </div>
        </div>
    );
}

export default Settings;
