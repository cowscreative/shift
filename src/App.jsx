import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";
import Likes from "./Screens/Likes";
import Events from "./Screens/Events";
import Browse from "./Screens/Browse";
import BottomNav from "./UI/BottomNav";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import MiniProfile from "./Components/MiniProfile";
import Loader from "./Components/Loader";
import AddToHomeScreenPrompt from "./Components/AddToHomeScreenPrompt";
import { IoChevronBackOutline } from "react-icons/io5";
import "/src/styles/App.css";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const showBackButton = location.pathname !== "/" && location.pathname !== "/cactus";

  return (
    <header className="app-header">
      <div className="header-left">
        {showBackButton && (
          <button className="header-btn back-btn" onClick={() => navigate(-1)}>
            <IoChevronBackOutline size={28} />
          </button>
        )}
        <h1 className="app-logo" onClick={() => navigate(".", { replace: true })}>
          Cactus
        </h1>
      </div>
      <button className="header-btn settings-btn" onClick={() => navigate("/profile")}>
        <MiniProfile />
      </button>
    </header>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const hour = new Date().getHours();
    const autoDark = hour < 6 || hour >= 18;
    const stored = localStorage.getItem("darkMode");
    const isDark = stored === null ? autoDark : stored === "true";
    document.body.classList.toggle("dark", isDark);
  }, []);

  const showLoader = location.pathname === "/" || location.pathname === "/cactus";

  return (
    <>
      {showLoader && <Loader />}
      <Header />
      <ScrollToTop />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <BottomNav />
      <AddToHomeScreenPrompt />
    </>
  );
}

export default App;
