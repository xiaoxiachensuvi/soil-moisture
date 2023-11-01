import React, { useEffect, useState } from 'react';
import { Channel, Feed, ApiResponse } from './types';
import Headline from './Headline';
import PercentBar from './PercentBar';

const App: React.FC = () => {
  const [moistureLevel, setMoistureLevel] = useState<number | null>(null);
  const [lastUpdate, setlastUpdate] = useState<string | null>(null);

  const minMoisture = 0.4;
  const maxMoisture = 0.65;
  const percentContainerHeight = 350; // 350px is the height of the percentage component


  const fetchData = () => {
    fetch('https://api.thingspeak.com/channels/2321499/feeds.json?results=1')
      .then(response => response.json())
      .then((data: ApiResponse) => {
        const field1Value = parseInt(data.feeds[0].field1, 10);

        // Map the value between 0 and 1
        const mappedValue = Math.min(Math.max((field1Value / 700), 0), 1);

        setMoistureLevel(mappedValue);
        setlastUpdate(data.feeds[0].created_at);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);

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
    <div>
      {moistureLevel !== null ? (
        <div className="data-container">
          <Headline alarmClassName={`alarm-icon ${determineBarClass()}`}></Headline>

          <PercentBar
            moistureLevel={moistureLevel}
            minMoisture={minMoisture}
            maxMoisture={maxMoisture}
            percentContainerHeight={percentContainerHeight}
          />
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );};

export default App;
