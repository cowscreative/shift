// src/Screens/Profile.jsx
import { useEffect, useState } from "react";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { currentUserId } from "../data/CurrentUser";
import { users } from "../data/mockDB";
import "../styles/Profile.css";

function Profile() {
  const currentUser = users.find((u) => u.id === currentUserId);

  const defaultData = {
    name: currentUser?.name || "Your Name",
    bio: currentUser?.bio || "",
    email: currentUser?.email || "",
    photo: currentUser?.avatar || ""
  };

  const [data, setData] = useState(defaultData);
  const [editing, setEditing] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userProfile"));
    if (saved) setData(saved);
  }, []);

  const updateField = (key, value) => {
    const updated = { ...data, [key]: value };
    setData(updated);
    localStorage.setItem("userProfile", JSON.stringify(updated));
  };

  const toggleDarkMode = () => {
    const current = localStorage.getItem("darkMode") === "true";
    const newValue = !current;
    localStorage.setItem("darkMode", newValue);
    window.location.reload(); // let App.jsx reapply dark mode
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

      <div className="profile-field toggle-row">
        <span>Dark Mode</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={localStorage.getItem("darkMode") === "true"}
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
