import './App.css';
import MainBox from './components/MainBox';
import React from 'react';
import TurnProvider from './components/TurnProvider';
function App() {
  return (
    <TurnProvider>
      <div className="App">
        <MainBox/>
      </div>
    </TurnProvider>
  );
}

export default App;
