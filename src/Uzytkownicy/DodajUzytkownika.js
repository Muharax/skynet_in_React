import React, { useState, useEffect, useRef } from 'react';
const URL = 'http://localhost:3001';

function DodajUzytkownika() {

  const [isCopied, setIsCopied] = useState(false);
  const passRef = useRef();


  const [formState, setFormState] = useState({
    user: "",
    imie: "",
    nazwisko: "",
    dataUrodzenia: "",
    pesel: "",
    adresZamieszkania: "",
    adresKorespondencyjny: "",
    pass: "",
    confirmpass: ""
  });
  
  useEffect(() => {
    const { imie, nazwisko, pesel } = formState;
    if (imie.length >= 3 && nazwisko.length >= 3 && pesel.length >= 4) {
      const username = imie.substr(0, 3) + nazwisko.substr(0, 3) + pesel[0] + pesel[2] + pesel[4];
      setFormState(currentState => ({ ...currentState, user: username }));
    }
  }, [formState.imie, formState.nazwisko, formState.pesel]);

  const generatepass = () => {
    const length = 20;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setFormState({ ...formState, pass: retVal, confirmpass: retVal });
    setIsCopied(false); 
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (e.target.name === 'pass' || e.target.name === 'confirmpass') {
      setIsCopied(false); // Odblokuj przycisk po wprowadzeniu nowego hasła
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formState.pass)
      .then(() => {
        setIsCopied(true);
      })
      .catch(err => console.error('Could not copy text: ', err));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Sprawdzanie, czy wszystkie pola formularza zostały wypełnione
    for (let key in formState) {
      if (key !== 'user' && formState[key] === "") {
        alert(`Proszę wypełnić pole: ${key}`);
        return;
      }
    }

    // Pobieranie tokenu użytkownika
    const userToken = localStorage.getItem('token'); 

    // Tworzenie żądania do endpointu '/adduser'
    try {
      const response = await fetch(`${URL}/adduser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        alert(`Błąd podczas dodawania użytkownika: ${data.message}`);
        return;
      }

      // Wyświetlanie alertu po pomyślnym dodaniu użytkownika
      alert("Pomyślnie dodano użytkownika.");

    } catch (error) {
      console.error('Error:', error);
      alert(`Wystąpił błąd podczas dodawania użytkownika: ${error}`);
    }
  };

  return (
    <div>
      <div className='dodajUzytkownika'>
        <form onSubmit={handleSubmit}>
          <div className='underForm'>
          <div className='COL11'>
            <div>Nazwa użytkownika</div>
            <div>Imię</div>
            <div>Nazwisko</div>
            <div>PESEL</div>
            <div>Data urodzenia</div>
            <div>Adres zamieszkania</div>
            <div>Adres adres korespondencyjny</div>
            <div className='myContainer'>
              <div>Hasło</div>
              {(formState.pass && formState.confirmpass && formState.pass === formState.confirmpass) &&
                <div className='btn-kopiuj'>
                  <button type="button" onClick={handleCopy} disabled={isCopied}>Kopiuj</button>
                </div>
              }
            </div>
            <div className='haslo2'>Powtórz hasło</div>
          </div>

          <div className='COL22'>
            <input type='text' value={formState.user} disabled/>
            <input type='text' value={formState.imie} onChange={handleChange} name='imie' />
            <input type='text' value={formState.nazwisko} onChange={handleChange} name='nazwisko' />
            <input type='text' value={formState.pesel} onChange={handleChange} name='pesel' />
            <input type='date' value={formState.dataUrodzenia} onChange={handleChange} name='dataUrodzenia' />
            <input type='text' value={formState.adresZamieszkania} onChange={handleChange} name='adresZamieszkania' />
            <input type='text' value={formState.adresKorespondencyjny} onChange={handleChange} name='adresKorespondencyjny' />
            <input 
                value={formState.pass} 
                type="password" 
                ref={passRef} 
                onChange={handleChange} 
                name="pass" 
                autoComplete="new-password"
              />

              <input 
                value={formState.confirmpass} 
                type="password" 
                onChange={handleChange} 
                name="confirmpass" 
                autoComplete="new-password"
              />
          </div>
          <div className='generujHasloDiv'>
            <div className='odw'>
              <button type="button" onClick={generatepass}>Generuj hasło</button>
            </div>
          </div>
          </div>
          <div>
            <button type="submit">Dodaj</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DodajUzytkownika;
