import { useEffect, useState } from "react";
import "../styles/Loader.css";

function Loader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setHide(true);
      sessionStorage.setItem("hideLoader", "true"); // prevent it from showing again
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (hide) return null;

  return (
    <div className="site-loader">
      <img src="https://cows.host/cactus/img/cactus-loader.png" alt="Loading cactus" className="loader-img" />
      <h1 className="loader-title">Don’t be a prick</h1>
      <p className="loader-sub">Loading your experience</p>
    </div>
  );
}

export default Loader;
