import React, { useState, useEffect } from 'react';
import './App.css';

// Speed of animation in milliseconds
const animationSpeed = 20;

// Komponent Div
const Div = ({ startAnimation, number }) => {
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
        setDisplayedNumber(number);
      }, 2000);
    }
  }, [isAnimating, number]);

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
      }}
    >
      {displayedNumber}
    </div>
  );
}

// Komponent Siatka
const Siatka = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [numbers, setNumbers] = useState([]);
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

    const timeout = setTimeout(() => {
      setStartAnimation(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [startAnimation]);

  for (let i = 0; i < 6; i++) {
    grid.push(
      <Div
        key={i}
        startAnimation={startAnimation}
        number={numbers[i]}
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
