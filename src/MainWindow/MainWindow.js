import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from "../Home/Home";
import Uzytkownicy from "../Uzytkownicy/Uzytkownicy";
import logo from './img/logo.png';
import Search from "./Search/Search";
import LogoutX from "../logout/logout";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import Siatka from "../siatka/siatka";
import Losowanie from "../siatka/losowanie";
import Losowanie2 from "../siatka/losowanie2";
import Test from "../test/test";
import '../App.css';

function MainWindow({ handleLogout, serverMessage, role }) {
    const [alertMessage, setAlertMessage] = useState('null');
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Router>
            <LogoutX onLogout={handleLogout} />
            <div className="alert"></div>
            <div className="MainWindow">
                <div className="alert">
                    {serverMessage && <div>{serverMessage}</div>}
                </div>
                <div className="COL1">
                    <div className="A1 LOGO">
                        <Link to="/Home">
                            <img className="logo-img" src={logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="B1">
                        <Search />
                    </div>
                </div>
                <div className="COL2">
                    <div className="A2">
                        <button onClick={handleMenuToggle} className="menu-button">
                            ☰
                        </button>
                        <div className={`MENU ${isOpen ? 'open' : ''}`}>
                            <Link to="/Home">Home</Link>
                            <Link to="/Lotto">Lotto</Link>
                            <Link to="/Losowanie">Losowanie</Link>
                            <Link to="/Losowanie2">Losowanie 2</Link>
                            <Link to="/Test">Test</Link>
                            <Link to="/Uzytkownicy">Uzytkownicy BEZ ADMIN</Link>
                            {role === 'admin' && <Link to="/Uzytkownicy">Uzytkownicy</Link>}
                        </div>
                    </div>
                    <div className="B2 OKNO">
                        <div id="content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/Home" element={<Home />} />
                                <Route path="/Lotto" element={<Siatka />} />
                                <Route path="/Losowanie" element={<Losowanie /> } />
                                <Route path="/Losowanie2" element={<Losowanie2 /> } />
                                <Route path="/Test" element={<Test /> } />
                            </Routes>
                            <PrivateRoute path="/Uzytkownicy" element={<Uzytkownicy />} setAlertMessage={setAlertMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default MainWindow;
