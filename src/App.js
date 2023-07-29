import './App.css';
import React, { useState } from "react";
import MainWindow from './MainWindow/MainWindow';
import Logowanie from './logowanie/logowanie';

function App() {
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("loggedIn")) || false);
  const [serverMessage, setServerMessage] = useState(null);

  const handleLogin = (message) => {
    setLoggedIn(true);
    setServerMessage(message);
    localStorage.setItem("loggedIn", true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setServerMessage(null);
    localStorage.removeItem("loggedIn");
  };

  return loggedIn 
    ? <MainWindow handleLogout={handleLogout} serverMessage={serverMessage} />
    : <Logowanie handleLogin={handleLogin} />
}

export default App;