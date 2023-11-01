import React, { useEffect, useState } from 'react';
import { Channel, Feed, ApiResponse } from './types';
import Headline from './Headline';
import PercentBar from './PercentBar';
import './App.css';

const App: React.FC = () => {
  const [moistureLevel, setMoistureLevel] = useState<number | null>(null);
  const [lastUpdate, setlastUpdate] = useState<string | null>(null);

  const minMoisture = 0.4;
  const maxMoisture = 0.65;
  const percentContainerHeight = 350; // 350px is the height of the percent


  const fetchData = () => {
    fetch('https://api.thingspeak.com/channels/2321499/feeds.json?results=1')
      .then(response => response.json())
      .then((data: ApiResponse) => {
        const field1Value = parseInt(data.feeds[0].field1, 10);

        // Map the value between 0 and 1
        const mappedValue = Math.min(Math.max((field1Value / 700), 0), 1);

        setMoistureLevel(mappedValue);
        setlastUpdate(toHumanReadableDate(data.feeds[0].created_at));
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

  const toHumanReadableDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  const idealTop = `${(1 - maxMoisture) * 100}%`;
  const idealHeight = `${(maxMoisture - minMoisture) * 100}%`;
  console.log(idealTop);

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
          <div className="last-update">Last update: {lastUpdate}</div>
          <a className="linkedin" href="https://www.linkedin.com/in/xiaoxiasuvichen/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
          </svg>
          </a>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );};

export default App;
