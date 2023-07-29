import React, { useState } from 'react';

function Uzytkownicy(){

   const data = [
      { name: 'John', age: 25, job: 'Engineer' },
      { name: 'Jane', age: 28, job: 'Designer' },
      { name: 'Bob', age: 32, job: 'Doctor' },
      { name: 'John', age: 25, job: 'Engineer' },
      { name: 'Jane', age: 28, job: 'Designer' },
      { name: 'Bob', age: 32, job: 'Doctor' },
      { name: 'John', age: 25, job: 'Engineer' },
      { name: 'Jane', age: 28, job: 'Designer' },
      { name: 'Bob', age: 32, job: 'Doctor' },
      { name: 'John', age: 25, job: 'Engineer' },
      { name: 'Jane', age: 28, job: 'Designer' },
      { name: 'Bob', age: 32, job: 'Doctor' },
      { name: 'John', age: 25, job: 'Engineer' },
      { name: 'Jane', age: 28, job: 'Designer' },
      { name: 'Bob', age: 32, job: 'Doctor' },
      { name: 'John', age: 25, job: 'Engineer' },
      { name: 'Jane', age: 28, job: 'Designer' },
      { name: 'Bob', age: 32, job: 'Doctor' },
      { name: 'John', age: 25, job: 'Engineer' },
      { name: 'Jane', age: 28, job: 'Designer' },
      { name: 'Bob', age: 32, job: 'Doctor' },
      { name: 'John', age: 25, job: 'Engineer' },
      { name: 'Jane', age: 28, job: 'Designer' },
      { name: 'Bob', age: 32, job: 'Doctor' },
      { name: 'John', age: 25, job: 'Engineer' },
      { name: 'Jane', age: 28, job: 'Designer' },
      { name: 'Bob', age: 32, job: 'Doctor' },
      { name: 'John', age: 25, job: 'Engineer' },
      { name: 'Jane', age: 28, job: 'Designer' },
      { name: 'Bob', age: 32, job: 'Doctor' },
      { name: 'John', age: 25, job: 'Engineer' },
      { name: 'Jane', age: 28, job: 'Designer' },
      { name: 'Bob', age: 32, job: 'Doctor' }
    ];
    const [displayData, setDisplayData] = useState(false);

    const handleClick = e => {
       e.preventDefault();
      //  const buttonName = e.target.innerText;
      //  const confirmLogout = window.confirm(buttonName);
      //  if (confirmLogout) {
      //    console.log('Użytkownik wylogowany.');
         setDisplayData(true);
      //  } else {
      //    setDisplayData(false);
      //  }
    };
 
    return(
      <div>
        <button onClick={handleClick}>Szukaj</button>
        <button onClick={handleClick}>Przyjęcie</button>
        <button onClick={handleClick}>Zwolenienie</button>
        <button onClick={handleClick}>Administracja</button>
 
        {displayData && (
          <div className="vh80">
            <table>
              <thead>
              <tr>
                 <th>Name</th>
                 <th>Age</th>
                 <th>Job</th>
              </tr>
              </thead>
              <tbody>
              {data.map((person, index) => (
                 <tr key={index}>
                    <td>{person.name}</td>
                    <td>{person.age}</td>
                    <td>{person.job}</td>
                 </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
 
      </div>
    )
 }
 
 export default Uzytkownicy;