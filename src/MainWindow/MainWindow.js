import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from "../Home/Home";
import Uzytkownicy from "../Uzytkownicy/Uzytkownicy";
import logo from './img/logo.png';
import Search from "./Search/Search";
import LogoutX from "../logout/logout";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import Siatka from "../siatka/siatka";

function MainWindow({ handleLogout, serverMessage, role}){

    const [alertMessage, setAlertMessage] = useState('null');

    return(
        <Router>  {/* Router na najwyższym poziomie */}
            <LogoutX onLogout={handleLogout} />
            <div className="alert"></div>
            <div className="MainWindow">  
                <div className="alert">
                    {serverMessage && <div>{serverMessage}</div>}
                </div>
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
                        
                        <Link to="/Home">Home</Link>
                        <Link to="/Lotto">Lotto</Link>
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