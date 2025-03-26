import { useEffect, useState } from "react";
import { currentUserId } from "../data/CurrentUser";
import { users } from "../data/mockDB";
import "./MiniProfile.css";

function MiniProfile() {
  const defaultUser = users.find((u) => u.id === currentUserId) || {
    name: "Gibson",
    bio: "I love connecting at events and discovering cool new spots.",
    email: "gibson@shift.app",
    avatar: "https://i.pravatar.cc/150?u=gibson",
    photo: "https://i.pravatar.cc/150?u=gibson",
    age: 37,
    neighborhood: "Zilker",
    lookingFor: "dating",
  };

  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userProfile") || "{}");
    const merged = { ...defaultUser, ...saved };
    setUser(merged);
  }, []);

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
      <img
        src={user.photo || user.avatar}
        alt="Avatar"
        className="mini-avatar"
      />
    </div>
  );
}

export default MiniProfile;
