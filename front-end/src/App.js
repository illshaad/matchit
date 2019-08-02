import React from 'react';
import Graphique from './Component/graphique'
import Countdown from './Component/countDown'
import './App.css';

function App() {
  return (
    <div className="App">
     <br/>
     <Countdown/>
     <Graphique/>
    </div>
  );
}

export default App;
