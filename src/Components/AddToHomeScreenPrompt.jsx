import { useEffect, useState } from "react";
import "./AddToHomeScreenPrompt.css";

function AddToHomeScreenPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone === true;

    const dismissed = sessionStorage.getItem("dismissedAddPrompt");

    if (isIos && isSafari && !isStandalone && !dismissed) {
      setTimeout(() => {
        setShow(true);
      }, 1000); // delay to avoid flash
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("dismissedAddPrompt", "true");
  };

  if (!show) return null;

  return (
    <div className="add-to-home-prompt">
      <div className="prompt-text">
        <strong>📲 Add Cactus to your Home Screen</strong>
        <p>
          Tap <span className="icon">⬆️</span> then <span className="highlight">“Add to Home Screen”</span> to use Cactus like an app.
        </p>
      </div>
      <button className="close-btn" onClick={handleClose}>×</button>
    </div>
  );
}

export default AddToHomeScreenPrompt;
