// W pliku App.js

import React, { useState, useEffect } from 'react';
import './App.css';

// Speed of animation in milliseconds
const animationSpeed = 20;

// Komponent Div
const Div = ({ startAnimation, number, showNumber }) => { // Dodano showNumber
  const [displayedNumber, setDisplayedNumber] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      setIsAnimating(true);
    }
  }, [startAnimation]);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setDisplayedNumber(Math.floor(Math.random() * 49 + 1));
      }, animationSpeed);

      setTimeout(() => {
        clearInterval(interval);
        setIsAnimating(false);
      }, 2000);
    } else if (showNumber) { // Pokaż wylosowaną liczbę, tylko jeśli showNumber jest prawda
      setDisplayedNumber(number);
    }
  }, [isAnimating, number, showNumber]); // Dodano showNumber

  return (
    <div 
      style={{
        width: '50px',
        height: '50px',
        border: '1px solid black',
        backgroundColor: '#eee',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',  // Dodane, aby ukryć przewijane liczby
      }}
    >
      <div 
        className={isAnimating ? 'number-spin' : ''} 
        style={{ 
          position: 'relative',  // Dodane, aby umożliwić przesunięcie
          top: isAnimating ? '0px' : '0px'  // Dodane, aby umożliwić przesunięcie
        }}
      >
        {displayedNumber}
      </div>
    </div>
  );
};

// Komponent Siatka
const Siatka = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [activeNumber, setActiveNumber] = useState(0); // Nowy stan
  const grid = [];

  const handleClick = () => {
    const nums = new Set();
    while(nums.size < 6) {
      nums.add(Math.floor(Math.random() * 49 + 1));
    }
    setNumbers([...nums]);
    setStartAnimation(true);
  }

  useEffect(() => {
    if (!startAnimation) return;

    let timeout;
    for (let i = 0; i < 6; i++) {
      timeout = setTimeout(() => {
        setActiveNumber(i);
      }, i * 2000);
    }

    return () => clearTimeout(timeout);
  }, [startAnimation]);

  for (let i = 0; i < 6; i++) {
    grid.push(
      <Div
        key={i}
        startAnimation={startAnimation && i === activeNumber}
        number={numbers[i]}
        showNumber={i <= activeNumber} // Dodano showNumber
      />
    );
  }

  return (
    <div className="grid" style={{userSelect: 'none', display: 'flex', gap: '10px', flexDirection: 'column'}}>
      <h1 style={{color: 'darkgreen', textAlign: 'center', margin: '20px 0'}}>Losowanie Lotto</h1>
      <div style={{display: 'flex', gap: '10px'}}>
        {grid}
        <button onClick={handleClick} style={{marginTop: '20px'}}>Losuj liczby</button>
      </div>
    </div>
  );
};

export default Siatka;
