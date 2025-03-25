import "/src/styles/AppButton.css";

function handlePress() {
    if ("vibrate" in navigator) {
        navigator.vibrate(50); // Vibrates for 50ms on mobile devices
    }
}

function AppButton({ onClick, children, className = "" }) {
    return (
        <button 
            onClick={(e) => {
                handlePress();
                if (onClick) onClick(e);
            }} 
            className={`app-button ${className}`}
        >
            {children}
        </button>
    );
}

export default AppButton;
