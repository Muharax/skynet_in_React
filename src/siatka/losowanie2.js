import React, { useState, useEffect, useRef } from 'react';
// import './styles.css';

function generateRandomNumbers(n, min, max) {
  let arr = [];
  for(let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

let randomNumbers = generateRandomNumbers(5, 1, 100); // generates 5 random numbers between 1 and 100
console.log(randomNumbers);


function Losowanie2() {
  const [numbers, setNumbers] = useState([
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 3, 4, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  ]);
  const [spin, setSpin] = useState(false);
  const intervalId = useRef(null);

  const spinColumn = (columnIndex) => {
    setNumbers(prevNumbers => {
      const newNumbers = [...prevNumbers];
      newNumbers[columnIndex] = [
        ...newNumbers[columnIndex].slice(1), 
        Math.floor(Math.random() * 10) 
      ];
      return newNumbers;
    });
  }

  useEffect(() => {
    if (spin) {
      intervalId.current = setInterval(() => {
        for (let i = 0; i < 3; i++) {
          spinColumn(i);
        }
      }, 1000); 
    } else {
      if (intervalId.current) clearInterval(intervalId.current);
    }

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [spin]);

  const handleSpinClick = () => {
    setSpin(!spin);
  };

  return (
    <div className='slot-machine'>
      <button onClick={handleSpinClick}>{spin ? 'STOP' : 'SPIN'}</button>
      <div className='number-display'>
        {numbers.map((column, columnIndex) => (
          <div key={columnIndex} className='number'>
            {column.map((number, numberIndex) => (
              <div key={numberIndex} className={`number-inner ${spin ? 'spin' : ''}`}>
                {number}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Losowanie2;
