import React from "react";

function LogoutX({ onLogout }) {
  const handleClick = e => {
    e.preventDefault();
    const confirmLogout = window.confirm('Czy na pewno chcesz się wylogować?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      console.log('Użytkownik wylogowany.');
      onLogout();  // Wywołanie przekazanej funkcji onLogout
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