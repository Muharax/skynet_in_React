import React, { useState, useEffect } from 'react';

import './App.css';

const generateShuffledNumbers = (min, max) => {
  let numbers = Array.from({length: max - min + 1}, (_, i) => i + min);
  for(let i = numbers.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
};

const Div = ({ startAnimation, number, animationDuration, minNumber, maxNumber, handleSliderChange, displayedNumbersProp }) => {
  const [displayedNumbers, setDisplayedNumbers] = useState(displayedNumbersProp || Array.from({length: maxNumber - minNumber + 1}, (_, i) => i + minNumber));
  const [lastStartAnimation, setLastStartAnimation] = useState(false);

  useEffect(() => {
    if (startAnimation && !lastStartAnimation) {
      const shuffledNumbers = generateShuffledNumbers(minNumber, maxNumber);
      setDisplayedNumbers(shuffledNumbers);
    }
    setLastStartAnimation(startAnimation);
  }, [startAnimation, minNumber, maxNumber]);


  return (
    <div style={{ margin: '20px' }}>
      <div>Speed Break</div>
      <input 
        className='rangeSpeed'
        type="range" 
        min="0.1" 
        max="0.4" 
        step="0.1" 
        value={animationDuration} 
        onChange={handleSliderChange} 
        orient="vertical"
        style={{writingMode: 'bt-lr'}}
      />
      <div style={{ width: '50px', height: '50px', border: '1px solid black', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        <div 
          className={startAnimation ? 'number-spin' : ''} 
          style={{ position: 'relative', animationDuration: `${animationDuration}s` }}
        >
          {displayedNumbers.map((num, index) => (
            <div key={index} style={{ marginBottom: '2px' }}>{num}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Siatka = () => {
  const [startAnimations, setStartAnimations] = useState([false, false, false, false, false, false]);
  const [numbers, setNumbers] = useState([]);
  const [displayedNumbersList, setDisplayedNumbersList] = useState([]);
  const [animationDurations, setAnimationDurations] = useState([0.1, 0.1, 0.1, 0.1, 0.1, 0.1]);
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(49);
  const [speedBreak, setSpeedBreak] = useState(3000);
  const grid = [];

  const handleClick = () => {
    const nums = new Set();
    while(nums.size < 6) {
      nums.add(Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber));
    }
    setNumbers([...nums]);
    setStartAnimations([true, true, true, true, true, true]);

    // Generuj unikalne listy numerów dla każdego komponentu Div
    const newDisplayedNumbersList = Array(6).fill().map(() => generateShuffledNumbers(minNumber, maxNumber));
    setDisplayedNumbersList(newDisplayedNumbersList);
  }

  useEffect(() => {
    let timeouts = [];
    for (let i = 0; i < 6; i++) {
      timeouts[i] = setTimeout(() => {
        setStartAnimations(prevStartAnimations => {
          const newStartAnimations = [...prevStartAnimations];
          newStartAnimations[i] = false;
          return newStartAnimations;
        });
      }, i * animationDurations[i] * speedBreak);
    }
  
    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, [numbers, animationDurations, speedBreak]); // Add speedBreak to the dependency array
  
  const handleSpeedBreakChange = (e) => {
    setSpeedBreak(Number(e.target.value)); // Set speedBreak when slider changes
  };

  for (let i = 0; i < 6; i++) {
    const handleSliderChange = (e) => {
      setAnimationDurations(animationDurations.map((duration, index) => {
        if (index === i) {
          return Number(e.target.value);
        } else {
          return duration;
        }
      }));
    }

    grid.push(
      <Div
        key={i}
        startAnimation={startAnimations[i]}
        number={numbers[i]}
        animationDuration={animationDurations[i]}
        minNumber={minNumber}
        maxNumber={maxNumber}
        handleSliderChange={handleSliderChange}
        displayedNumbersProp={displayedNumbersList[i]} // Zmieniono nazwę na displayedNumbersProp
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Losowanie Lotto</h1>
      <div style={{ display: 'flex' }}>
        {grid}
      </div>
      <input 
        type="range" 
        min="1000" 
        max="20000" 
        step="1000" 
        value={speedBreak} 
        onChange={handleSpeedBreakChange} 
      />
      <button onClick={handleClick}>Losuj liczby</button>
    </div>
  );
};

export default Siatka;
