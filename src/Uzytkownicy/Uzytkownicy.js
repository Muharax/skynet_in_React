import React, { useState } from 'react';
import SzukajUzytkownika from './SzukajUzytkownika';
import DodajUzytkownika from './DodajUzytkownika';

function Uzytkownicy() {
  const [activeComponent, setActiveComponent] = useState(''); // state do przechowywania aktywnego komponentu

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  }

  let content;
  switch(activeComponent) {
    case 'SzukajUzytkownika':
      content = <SzukajUzytkownika />
      break;
    case 'DodajUzytkownika':
      content = <DodajUzytkownika />
      break;
    default:
      content = <p></p>
  }

  return (
    <div>
      <button disabled={activeComponent === 'SzukajUzytkownika'} onClick={() => handleButtonClick('SzukajUzytkownika')}>Szukaj użytkownika</button>
      <button disabled={activeComponent === 'DodajUzytkownika'} onClick={() => handleButtonClick('DodajUzytkownika')}>Dodaj użytkownika</button>

      <div className="output">
        {content}
      </div>
    </div>
  );
};

export default Uzytkownicy;
