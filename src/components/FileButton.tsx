import React, { useState } from "react";

const FlutteringButton: React.FC = () => {
  const [position, setPosition] = useState<{ top: string; left: string }>({
    top: "50%",
    left: "50%",
  });

  const moveButton = () => {
    const newTop = Math.floor(Math.random() * 80) + 10; // 10% - 90%
    const newLeft = Math.floor(Math.random() * 80) + 10; // 10% - 90%
    setPosition({ top: `${newTop}%`, left: `${newLeft}%` });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <button
        onMouseEnter={moveButton}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          transform: "translate(-50%, -50%)",
        }}
        className="px-6 py-3 text-lg font-bold text-white rounded-xl shadow-lg 
                   transition-all duration-500 ease-in-out
                   bg-gradient-to-r from-purple-500 to-pink-500
                   hover:from-pink-500 hover:to-purple-500
                   animate-pulse"
      >
        Epstein Files
      </button>
    </div>
  );
};

export default FlutteringButton;
