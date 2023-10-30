import React, { useEffect, useState } from 'react';
import { Channel, Feed, ApiResponse } from './types';
import Headline from './Headline';
import './percent.css'; // Make sure to import the stylesheet


const App: React.FC = () => {
  const [moistureLevel, setMoistureLevel] = useState<number | null>(null);
  const minMoisture = 0.2;
  const maxMoisture = 0.8;
  const percentContainerHeight = 350; // 350px


  const fetchData = () => {
    // Replace with your API URL
    fetch('https://api.thingspeak.com/channels/2321499/feeds.json?results=1')
      .then(response => response.json())
      .then((data: ApiResponse) => {
        const field1Value = parseInt(data.feeds[0].field1, 10);

        // Map the value between 0 and 1
        const mappedValue = Math.min(Math.max((field1Value / 700), 0), 1);

        setMoistureLevel(mappedValue);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // 5000ms = 5s

    // Cleanup: clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const determineBarClass = () => {
    if (moistureLevel !== null) {
      if (moistureLevel < minMoisture) return 'status-red';
      if (moistureLevel > maxMoisture) return 'status-orange';
    }
    return 'status-green';
  };

  const idealTop = `${minMoisture * 100}%`;
  const idealHeight = `${(maxMoisture - minMoisture) * 100}%`;

  return (
    <div className="data-container">
      <Headline alarmClassName={`alarm-icon ${determineBarClass()}`}></Headline>
      {moistureLevel !== null ? (
        <div className="percentage-bar-container">
          <div className="ideal-percentage-bar-filled" style={{ top: idealTop, height: idealHeight }}>
            <div className="ideal-percentage-bar-strikes">
              <div className="ideal-percentage-bar-strikes-instruction">Optimal Moisture Level</div>
            </div>
          </div>
          <div className={`percentage-bar-filled ${determineBarClass()}`} style={{ height: moistureLevel*percentContainerHeight }}></div>
          <div className="percentage-value">{(moistureLevel*100).toFixed(2)}%</div>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );};

export default App;
