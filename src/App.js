import React from 'react'
import './App.css';
import Topbar from './components/Topbar';
import Signup from './components/Auth/Signup';

function App() {
  return (
    <div className="App">
      <Topbar/>
      <Signup/>
    </div>
  );
}

export default App;
