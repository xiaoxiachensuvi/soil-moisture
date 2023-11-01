import React from 'react';
import './PercentBar.css'; // Make sure to import the stylesheet

interface PercentBarProps {
  moistureLevel: number;
  minMoisture: number;
  maxMoisture: number;
  percentContainerHeight: number;
}

const PercentBar: React.FC<PercentBarProps> = ({ moistureLevel, minMoisture, maxMoisture, percentContainerHeight }) => {
  const determineBarClass = () => {
    if (moistureLevel < minMoisture) return 'status-red';
    if (moistureLevel > maxMoisture) return 'status-orange';
    return 'status-green';
  };

  const idealTop = `${minMoisture * 100}%`;
  const idealHeight = `${(maxMoisture - minMoisture) * 100}%`;

  return (
    <div className="percentage-bar-container">
      <div className="ideal-percentage-bar-filled" style={{ top: idealTop, height: idealHeight }}>
        <div className="ideal-percentage-bar-strikes">
          <div className="ideal-percentage-bar-strikes-instruction">Optimal Moisture Level</div>
        </div>
      </div>
      <div className={`percentage-bar-filled ${determineBarClass()}`} style={{ height: moistureLevel*percentContainerHeight }}></div>
      <div className="percentage-value">{(moistureLevel*100).toFixed(2)}%</div>
    </div>
  );
};

export default PercentBar;
