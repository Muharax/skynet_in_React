import React from "react";
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from "../Home/Home";
import Uzytkownicy from "../Uzytkownicy/Uzytkownicy";
import logo from './img/logo.png';
import Search from "./Search/Search";

function MainWindow(){

    const handleClick = e => {
        e.preventDefault();
        const confirmLogout = window.confirm('Czy na pewno chcesz się wylogować?');
        if (confirmLogout) {
          console.log('Użytkownik wylogowany.');
          // Kod do wylogowania użytkownika
        }
    }


    return(
        <Router>  {/* Router na najwyższym poziomie */}
            <div className="EXIT">
                <button className="btn-1" id="logout" onClick={handleClick}>X</button>
            </div>

            <div className="MainWindow">  
                <div className="COL1">
                    <div className="A1 LOGO">
                        <Link to="/Home">  {/* Dodanie linku do logo */}
                            <img className="logo-img" src={logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="B1">
                        <Search></Search>
                    </div>
                </div>

                <div className="COL2">
                    <div className="A2">
                        <div className="MENU">
                            <Link to="/Uzytkownicy">Użytkownicy</Link>
                            <Link to="/Rachunki">Rachunki</Link>
                            <Link to="/Finanse">Finanse</Link>
                        </div>
                    </div>
                    <div className="B2 OKNO">
                            <div id="content">
                            <Routes>
                                <Route path="/" element={<Home />} />

                                <Route path="/Home" element={<Home />} />                                
                                <Route path="/Uzytkownicy" element={<Uzytkownicy />} />
                            </Routes>
                            </div>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default MainWindow;