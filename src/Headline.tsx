import React from 'react';
import './Headline.css';

interface HeadlineProps {
  alarmClassName?: string;
}

const Headline: React.FC<HeadlineProps> = ({ alarmClassName }) => {
  return (
    <div className="headline-container">
      <h1 className="headline">Calathea</h1>
      <p className="description">the Living Plant</p>
      <div className={`${alarmClassName}`}></div>
      <h2 className="subheadline">Soil Moisture Level</h2>
    </div>
  );
};

export default Headline;
