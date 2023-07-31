import './App.css';
import React, { useState } from "react";
import MainWindow from './MainWindow/MainWindow';
import Logowanie from './logowanie/logowanie';

function App() {
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("loggedIn")) || false);
  const [serverMessage, setServerMessage] = useState(null);

  const handleLogin = (message) => {
    console.log("Zwrócono Logowanie");
    localStorage.setItem("loggedIn", true);
    setLoggedIn(true);
    setServerMessage(message);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setServerMessage(null);
    localStorage.clear();
  };

  return loggedIn 
    ? <MainWindow handleLogout={handleLogout} serverMessage={serverMessage} user={localStorage.getItem('user')} role={localStorage.getItem('role')}/>
    : <Logowanie handleLogin={handleLogin} />
}

export default App;