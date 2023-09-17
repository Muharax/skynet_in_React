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
import Test2 from "../test/test2";
import '../App.css';
import Webgl from "../test/test5-webgl";
import UserPanel from "../userpanel/userpanel";
import './MainWindow.css';
import CanvasComponent from "../siatka/siatka-izometryczna";
import Open from "../gra/open/open";
import TreeGame2 from "../gra/open2/open2";
import Game from "../game/game";
import Game2D from "../gra/open3/open3";

function MainWindow({ handleLogout, serverMessage, role }) {
    const [alertMessage, setAlertMessage] = useState('null');
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Router>
            <LogoutX onLogout={handleLogout} />
            <UserPanel></UserPanel>
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

                            <Link to="/Home" >Home</Link>
                            <Link to="/Lotto">Lotto</Link>
                            <Link to="/Losowanie">Losowanie</Link>
                            <Link to="/Siatka-Izometryczna">Siatka Izometrycznaa</Link>
                            <Link to="/Test">Test2</Link>
                            <Link to="/webgl">Drzewo Komponentów</Link>
                            <Link to="/Uzytkownicy">Uzytkownicy BEZ ADMIN</Link>
                            <Link to="/Open">Gra Open</Link>
                            <Link to="/TreeGame2">Gra Open 2</Link>
                            <Link to="/Game2D">Gra Open 3</Link>
                            <Link to="/Game">Game</Link>
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
                                <Route path="/Siatka-Izometryczna" element={<CanvasComponent /> } />
                                <Route path="/Test" element={<Test2 /> } />
                                <Route path="/webgl" element={<Webgl /> } />
                                <Route path="/Open" element={<Open /> } />
                                <Route path="/Game2D" element={<Game2D /> } />
                                <Route path="/Game" element={<Game /> } />
                                <Route path="/TreeGame2" element={<TreeGame2 /> } />
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
