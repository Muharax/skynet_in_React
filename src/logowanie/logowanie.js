import React, { useState, useEffect } from "react";
import logo from '../MainWindow/img/logo.png';

const URL = 'http://localhost:3001';

function Logowanie({ handleLogin }) {
  const [username, setUsername] = useState("ADMIN11");
  const [password, setPassword] = useState("admino");
  const [token, setToken] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    setToken(generateToken());
  }, []);

  const generateToken = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(username == "ADMIN11" && password =="admino"){
      handleLogin("Logowanie poprawne");
      return;
    }else{
      setServerMessage(`${username} nie ma w bazie`);
      return;
    }
    // try {
    //   const response = await fetch(`${URL}/logowanie`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password, token })
    //   });

    //   const data = await response.json();
    //   setServerMessage(data.message);
      
    //   if (data.token) {
    //     localStorage.setItem('token', data.token);
    //     handleLogin(data.message);
    //   }
    // } catch (error) {
    //   setServerMessage(`Niepoprawne dane logowania: ${error.message}`);
    // }
  };

  // Rest of your component...

  return (
    <div id="LOGOWANIE">
      <div className="alert">{serverMessage && <div>{serverMessage}</div>}</div>
      <div className="LG">
        <div className="logos">
          <img src={logo} alt="" className="logos-SWG" />
        </div>

        <div id="logowanie-s">
          <form onSubmit={handleSubmit}>
          <input
                type="hidden"
                id="token"
                autoComplete="off"
                name="token"
                placeholder="Token"
                value={token}
                className="w100"
              />

            <div id="name">
              <i className="material-icons prefix cwhite">apps</i>
              <input
                type="text"
                id="first"
                autoComplete="off"
                autoFocus="On"
                name="user"
                placeholder="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w100"
                // required
              />
            </div>

            <div id="pass">
              <i className="material-icons prefix cwhite">lock</i>
              <input
                type="password"
                id="second"
                autoComplete="off"
                name="pass"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w100"
                // required
              />
            </div>

            <div id="btn-log-in">
              <div className="wrapper">
                <div className="box">
                  <button type="submit" className="log-in" id="sub">
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

  