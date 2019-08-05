import React from 'react';
import Graphic from './Component/graphic'
import Countdown from './Component/countDown'
import './App.css';

function App() {
  return (
    <div className="App">
     <br/>
     <Countdown Countdown="5"/>
     <Graphic/>
    </div>
  );
}

export default App;
