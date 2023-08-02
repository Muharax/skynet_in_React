import React, { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import MainWindow from './MainWindow/MainWindow';
import Logowanie from './logowanie/logowanie';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

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
    setServerMessage('null');
    localStorage.clear();
  };

  console.log(loggedIn);

  return (
    <ApolloProvider client={client}>
      {loggedIn
        ? <MainWindow 
              handleLogout={handleLogout} 
              serverMessage={serverMessage} 
              user={localStorage.getItem('user')} 
              role={localStorage.getItem('role')}/>
        : <Logowanie handleLogin={handleLogin} />
      }
    </ApolloProvider>
  )
};

export default App;