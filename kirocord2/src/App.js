import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';


function App() {
  return (
    // BEM naming convention making App into app
    <div className="app">
      <Sidebar />

      
      
      {/* Chat */}
      <Chat />



    </div>
  );
}

export default App;
