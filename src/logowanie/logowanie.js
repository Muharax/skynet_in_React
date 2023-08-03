import React, { useState, useEffect } from "react";
import jwtDecode from 'jwt-decode';
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
    console.log('Zanciśnięto przycisk Logowania');

    // OPERACJA DLA GITHUB PAGES
    if(username == "ADMIN11" && password =="admino"){
      handleLogin("Logowanie poprawne");
      return;
    }else{
      setServerMessage(`${username} nie ma w bazie`);
      return;
    }




    // OPERACJA DLA BAZY DANYCH


    // try {
    //   const response = await fetch(`${URL}/logowanie`, {
    //     method: 'post',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password, token })
    //   });

    //   const data = await response.json();

    //   if (data.token) {
    //     setServerMessage(data.message);
    //     localStorage.setItem('token', data.token);
    //     const decodedToken = jwtDecode(data.token);
    //     localStorage.setItem('user', decodedToken.user);
    //     localStorage.setItem('role', decodedToken.role);
    //       console.log(`Użytkownik: ${decodedToken.user}, Token: ${data.token}, Rola: ${decodedToken.role}`);
    //     handleLogin(data.message);
    //   }
    // } catch (error) {
    //   setServerMessage(`Niepoprawne dane logowania: ${error.message}`);
    // }  finally {
    //     console.log('Blok finally - logowanie');
    // }


  };
  

  // return ...

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
              <i className="material-icons prefix cwhite">🙍‍♂️</i>
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
              <i className="material-icons prefix cwhite">🔑</i>
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

  