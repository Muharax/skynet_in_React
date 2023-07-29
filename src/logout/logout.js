import React from "react";

function Logout_X({ onLogout }) {
  const handleClick = e => {
    e.preventDefault();
    const confirmLogout = window.confirm('Czy na pewno chcesz się wylogować?');
    if (confirmLogout) {
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

export default Logout_X;