// src/Components/MiniProfile.jsx
import { currentUserId } from "../data/CurrentUser";
import { users } from "../data/mockDB";
import "./MiniProfile.css";

function MiniProfile() {
  const user = users.find(u => u.id === currentUserId);
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 18 ? "Good afternoon" :
    "Good evening";

  return (
    <div className="mini-profile">
      <div>
        <p className="greeting">{greeting},</p>
        <h2 className="user-name">{user.name}</h2>
      </div>
      <img src={user.avatar} alt="Avatar" className="mini-avatar" />
    </div>
  );
}

export default MiniProfile;
