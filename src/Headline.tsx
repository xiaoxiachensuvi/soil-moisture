import React from 'react';
import './Headline.css';

const Headline: React.FC = () => {
  return (
    <div className="headline-container">
      <h1 className="headline">Calathea</h1>
      <h2 className="subheadline">the Living Plant</h2>
      <p className="description">Soil Moisture Level</p>
    </div>
  );
};

export default Headline;
