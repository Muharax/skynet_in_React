import React, { useState, } from "react";
import logo from '../MainWindow/img/logo.png';

function Logowanie({ handleLogin }) {
  // Tworzenie stanu dla formularza
  const [username, setUsername] = useState("ADMIN11");
  const [password, setPassword] = useState("admino");

  // Obsługa logowania
  const handleSubmit = (event) => {
    event.preventDefault();
    // Sprawdzanie, czy dane logowania są poprawne
    if (username === "ADMIN11" && password === "admino") {
      alert("Zalogowano pomyślnie!");
      setUsername("");
      setPassword("");
      handleLogin();  // Wywołanie `handleLogin` po udanym logowaniu
    } else {
      alert("Niepoprawne dane logowania");
    }
  };

  return (
    <div id="LOGOWANIE">
      <div class="LG">
        <div class="logos">
          <img src={logo} alt="" class="logos-SWG" />
        </div>

        <div id="logowanie-s">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="token" value="" />

            <div id="name">
              <i class="material-icons prefix cwhite">apps</i>
              <input
                type="text"
                id="first"
                autocomplete="off"
                autofocus="On"
                name="user"
                placeholder="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                class="w100"
                required
              />
            </div>

            <div id="pass">
              <i class="material-icons prefix cwhite">lock</i>
              <input
                type="password"
                id="second"
                autocomplete="off"
                name="pass"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="w100"
                required
              />
            </div>

            <div id="btn-log-in">
              <div class="wrapper">
                <div class="box">
                  <button type="submit" class="log-in" id="sub">
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Logowanie;