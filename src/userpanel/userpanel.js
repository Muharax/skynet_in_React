import React from "react";
import './userpanel.css';

function UserPanel() {

  const user = localStorage.getItem('user');

  return(
    <div className="userPanel">
      <div className="userPanelLog">
        <div><strong>Zalogowany:</strong>&nbsp;</div>
        <div><i>{user}</i></div>
      </div>

      <div className="userPanelBtn">
        <button className="btn-2">?</button>
      </div>
    </div>
)};

export default UserPanel;

  