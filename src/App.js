import './App.css';
import React, { Component } from "react";
import Login from "./login.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from './menu';

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
      <Menu />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
      </>
    );
  }
}

export default App;