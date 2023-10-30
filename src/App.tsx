import React, { useEffect, useState } from 'react';
import { Channel, Feed, ApiResponse } from './types';
import './percent.css'; // Make sure to import the stylesheet


const App: React.FC = () => {
  const [moistureLevel, setMoistureLevel] = useState<number | null>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      {moistureLevel !== null ? (
        <div>
          <div className="alarm-icon red">
            Moisture Level: {moistureLevel}
          </div>
          <div className="percentage-bar-container">
            <div className="percentage-bar-filled" style={{ height: 100 }}></div>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );};

export default App;
