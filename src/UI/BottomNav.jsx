import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineLineChart, AiOutlineUser } from "react-icons/ai";
import { IoBarbellOutline } from "react-icons/io5";
import "/src/styles/BottomNav.css"; // Import updated styles

function BottomNav() {
    const location = useLocation();

    return (
        <nav className="bottom-nav">
            <NavItem to="/" label="Home" icon={<AiOutlineHome />} active={location.pathname === "/"} />
            <NavItem to="/workouts" label="Workouts" icon={<IoBarbellOutline />} active={location.pathname === "/workouts"} />
            <NavItem to="/stats" label="Stats" icon={<AiOutlineLineChart />} active={location.pathname === "/stats"} />
            <NavItem to="/profile" label="Profile" icon={<AiOutlineUser />} active={location.pathname === "/profile"} />
        </nav>
    );
}

function NavItem({ to, label, icon, active }) {
    return (
        <Link to={to} className={`nav-item ${active ? "active" : ""}`}>
            {icon}
            <span>{label}</span>
        </Link>
    );
}

export default BottomNav;
