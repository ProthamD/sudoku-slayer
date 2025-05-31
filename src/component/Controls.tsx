import React from "react";

interface ControlsProps {
  onNewGame: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onNewGame }) => {
  return (
    <div className="controls">
      <button onClick={onNewGame}>New Game</button>
    </div>
  );
};

export default Controls;