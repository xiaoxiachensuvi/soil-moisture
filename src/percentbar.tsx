import React, { useState, useEffect } from 'react';
import './percent.css'; // Make sure to import the stylesheet

const PercentBar: React.FC = () => {
  const [percent, setPercent] = useState(0);

  // Simulate percent changing over time; you can replace this with your logic
  useEffect(() => {
    const timer = setInterval(() => {
      setPercent(prevPercent => (prevPercent + 0.1) % 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filledHeight = `${percent * 100}%`;

  return (
    <div className="percentage-bar-container">
      <div className="percentage-bar-filled" style={{ height: filledHeight }}></div>
    </div>
  );
};

export default PercentBar;
