import './App.css';
import React, { Component } from "react";
import MainWindow from './MainWindow/MainWindow';
// import Login from "./login.js";
// import { Routes, Route, Router} from 'react-router-dom';
// import Menu from './menu';

class App extends Component {
  state = {
    loggedIn: false,
  };

  handleLogin = () => {
    // tu powinna być logika logowania, np. zapytanie do API
    this.setState({ loggedIn: true });
  };

  handleLogout = () => {
    // tu powinna być logika wylogowywania, np. usunięcie tokena
    this.setState({ loggedIn: false });
  };

  render() {
    return (
      <>
      <MainWindow />
      
        {/* <Routes>
          <Router>
            <Route path="/" element={<Login />} />
            </Router>
        </Routes>
       */}
      </>
    );
  }
}

export default App;