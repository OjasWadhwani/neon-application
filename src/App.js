import React from 'react';
import ResumeViewer from './resume';
import CoverViewer from './cover';
import neon from './neon.svg';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="tooltip">
          <span className="tooltiptext">I hope I don't get sued for this logo</span>
          <img src={neon} className="Neon-logo" alt="neon" />
        </div>
        <div className='application'>
          <ResumeViewer />
          <CoverViewer />
        </div>
      </header>
    </div>
  );
};

export default App;
