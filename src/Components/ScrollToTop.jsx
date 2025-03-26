import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // on route change
  }, [pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0 }); // on first mount
  }, []); // 👈 empty dependency = run only once on initial load

  return null;
}

export default ScrollToTop;
