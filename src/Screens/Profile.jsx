// src/Screens/Profile.jsx
import { useEffect, useState } from "react";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { currentUserId } from "../data/CurrentUser";
import { users } from "../data/mockDB";
import "../styles/Profile.css";

function Profile() {
  const currentUser = users.find((u) => u.id === currentUserId) || {};

  const defaultData = {
    name: currentUser.name || "Gibson",
    bio: currentUser.bio || "I love connecting at events and discovering cool new spots.",
    email: currentUser.email || "gibson@shift.app",
    photo: currentUser.avatar || "https://i.pravatar.cc/150?u=gibson",
    age: currentUser.age || 37,
    neighborhood: currentUser.neighborhood || "Zilker",
    lookingFor: currentUser.lookingFor || "dating",
  };

  const [data, setData] = useState(defaultData);
  const [editing, setEditing] = useState({});
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userProfile"));
    const profile = saved && saved.name ? saved : defaultData;
    setData(profile);
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, []);

  const updateField = (key, value) => {
    const updated = { ...data, [key]: value };
    setData(updated);
    localStorage.setItem("userProfile", JSON.stringify(updated));
  };

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    document.body.classList.toggle("dark", newValue);
    localStorage.setItem("darkMode", newValue);
  };

  const clearCache = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <div className="profile-photo-block">
        <img src={data.photo} alt="User avatar" className="profile-photo" />
        <div className="photo-input">
          <IoPencilOutline className="edit-icon" />
          <input
            type="text"
            value={data.photo}
            onChange={(e) => updateField("photo", e.target.value)}
            placeholder="Paste image URL"
          />
        </div>
      </div>

      <div className="profile-field">
        <span>Name:</span>
        {editing.name ? (
          <input
            value={data.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => setEditing({ ...editing, name: false })}
            autoFocus
          />
        ) : (
          <div onClick={() => setEditing({ ...editing, name: true })}>
            {data.name} <IoPencilOutline className="icon-inline" />
          </div>
        )}
      </div>

      <div className="profile-field">
        <span>Bio:</span>
        {editing.bio ? (
          <textarea
            value={data.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            onBlur={() => setEditing({ ...editing, bio: false })}
            autoFocus
          />
        ) : (
          <div onClick={() => setEditing({ ...editing, bio: true })}>
            {data.bio} <IoPencilOutline className="icon-inline" />
          </div>
        )}
      </div>

      <div className="profile-field">
        <span>Age:</span>
        <input
          type="number"
          value={data.age}
          onChange={(e) => updateField("age", e.target.value)}
          placeholder="Your age"
        />
      </div>

      <div className="profile-field">
        <span>Neighborhood:</span>
        <input
          type="text"
          value={data.neighborhood}
          onChange={(e) => updateField("neighborhood", e.target.value)}
          placeholder="e.g., Zilker"
        />
      </div>

      <div className="profile-field">
        <span>Looking For:</span>
        <input
          type="text"
          value={data.lookingFor}
          onChange={(e) => updateField("lookingFor", e.target.value)}
          placeholder="e.g., dating, friends"
        />
      </div>

      <div className="profile-field toggle-row">
        <span>Dark Mode</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <span className="slider"></span>
        </label>
      </div>

      <button onClick={clearCache} className="clear-btn">
        <IoTrashOutline className="icon-inline" />
        Clear Cache
      </button>
    </div>
  );
}

export default Profile;
