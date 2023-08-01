import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './App.css';

const generateShuffledNumbers = (min, max) => {
  let numbers = Array.from({length: max - min + 1}, (_, i) => i + min);
  for(let i = numbers.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
};

const Losowanie2 = () => {
  const [displayedNumbers, setDisplayedNumbers] = useState(generateShuffledNumbers(1, 49));
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [numbersToDisplay, setNumbersToDisplay] = useState(10); // ile numerów jest jednocześnie widocznych
  const [animationSpeed, setAnimationSpeed] = useState(1000); // szybkość animacji w milisekundach
  const [isRunning, setIsRunning] = useState(false); // czy animacja jest uruchomiona

  useEffect(() => {
    let intervalId;

    if(isRunning) {
      intervalId = setInterval(() => {
        setCurrentNumberIndex((currentNumberIndex + 1) % displayedNumbers.length);
      }, animationSpeed);
    }

    return () => clearInterval(intervalId);
  }, [currentNumberIndex, isRunning, animationSpeed, displayedNumbers]);

  const startAnimation = () => {
    setIsRunning(true);
  };

  const stopAnimation = () => {
    setIsRunning(false);
  };

  return (
    <div>
      <button onClick={startAnimation}>Start</button>
      <button onClick={stopAnimation}>Stop</button>
      <div>
        {displayedNumbers.slice(currentNumberIndex, currentNumberIndex + numbersToDisplay).map(number => <div key={number}>{number}</div>)}
      </div>
    </div>
  );
};

export default Losowanie2;
