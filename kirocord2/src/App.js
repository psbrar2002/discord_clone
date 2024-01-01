import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import { selectUser } from "./features/userSlice"
import Login from './Login';

function App() {
  const user = useSelector(selectUser);
  return (
    // BEM naming convention making App into app
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />

      )}
    </div>
  );
}

export default App;
