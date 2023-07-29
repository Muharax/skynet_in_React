import './App.css';
import React, { Component } from "react";
import MainWindow from './MainWindow/MainWindow';
import Logowanie from './logowanie/logowanie';

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
    if (this.state.loggedIn) {
      return <MainWindow handleLogout={this.handleLogout} />
    } else {
      return <Logowanie handleLogin={this.handleLogin} />
    }
  }
}

  


export default App;