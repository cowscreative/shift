import { useEffect, useState } from "react";
import "../styles/Loader.css";

function Loader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" }); // 👈 Force scroll at exact moment loader clears
      setHide(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (hide) return null;

  return (
    <div className="site-loader">
      <div className="loader-circle" />
      <h1 className="loader-title">SHIFT</h1>
      <p className="loader-sub">Find your person, in real life.</p>
    </div>
  );
}

export default Loader;
