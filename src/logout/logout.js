import React from "react";
import { useNavigate } from 'react-router-dom'; // import useNavigate
import './logout.css';

function LogoutX({ onLogout }) {
  const navigate = useNavigate(); // Utwórz instancję navigate

  const handleClick = e => {
    e.preventDefault();
    const confirmLogout = window.confirm('Czy na pewno chcesz się wylogować?');
    if (confirmLogout) {
      localStorage.clear();
      console.log('Użytkownik wylogowany.');
      onLogout();  // Wywołanie przekazanej funkcji onLogout
      navigate('/');  // Przekierowanie do strony głównej
    }
  }

  return (
    <div>
      <div className="EXIT">
        <button className="btn-1" id="logout" onClick={handleClick}>X</button>
      </div>
    </div>
  );
}

export default LogoutX;
