import React, { useState, useEffect } from 'react';

import './App.css';
import './siatka.css';

const generateShuffledNumbers = (min, max) => {
  let numbers = Array.from({length: max - min + 1}, (_, i) => i + min);
  for(let i = numbers.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
};

const Div = ({ startAnimation, animationDuration, minNumber, maxNumber, handleSliderChange, displayedNumbersProp, onStop, number }) => {
  const [displayedNumbers, setDisplayedNumbers] = useState(displayedNumbersProp || Array.from({length: maxNumber - minNumber + 1}, (_, i) => i + minNumber));
  const [lastStartAnimation, setLastStartAnimation] = useState(false);
  const [isStopped, setIsStopped] = useState(false); // Nowy stan, który śledzi, czy animacja jest zatrzymana

  const handleStopClick = () => {
    onStop();
    setIsStopped(true); // Nowa funkcja, która zatrzymuje animację
  };

  useEffect(() => {
    if (startAnimation && !lastStartAnimation && !isStopped) {
      const shuffledNumbers = generateShuffledNumbers(minNumber, maxNumber);
      setDisplayedNumbers(shuffledNumbers);
    } else if (isStopped) {
      setIsStopped(false); // Zresetuj stan zatrzymania po zakończeniu animacji
      setDisplayedNumbers([number]); // Ustaw displayedNumbers na przekazaną liczbę
    }
    setLastStartAnimation(startAnimation);
  }, [startAnimation, minNumber, maxNumber, isStopped, number]); // Dodaj number do tablicy zależności


  return (
    <div className='grido2'>
      <button onClick={handleStopClick}>Stop</button> {/* Nowy przycisk stop */}
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
  const [numbers, setNumbers] = useState([]);
  const [startAnimations, setStartAnimations] = useState([false, false, false, false, false, false]);
  
  const [displayedNumbersList, setDisplayedNumbersList] = useState([]);
  const [animationDurations, setAnimationDurations] = useState([0.1, 0.2, 0.6, 0.1, 0.1, 0.1]);
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(49);
  const [speedBreak, setSpeedBreak] = useState(3000);
  const grid = [];

  const handleClick = () => {
    const nums = new Set();
    console.log(`S: ${nums}`);
    while(nums.size < 6) {
      nums.add(Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber));
    }
    setNumbers([...nums]);
    setStartAnimations([true, true, true, true, true, true]);

    // Generuj unikalne listy numerów dla każdego komponentu Div
    const newDisplayedNumbersList = Array(6).fill().map(() => generateShuffledNumbers(minNumber, maxNumber));
    // console.log(newDisplayedNumbersList);
    // console.log(`S: `);
    setDisplayedNumbersList(newDisplayedNumbersList);
    
  }

  const stopAnimation = (index) => {
    setStartAnimations(prevStartAnimations => {
      const newStartAnimations = [...prevStartAnimations];
      newStartAnimations[index] = false;
      return newStartAnimations;
    });
  };

  // useEffect(() => {
  //   let timeouts = [];
  //   for (let i = 0; i < 6; i++) {
  //     timeouts[i] = setTimeout(() => {
  //       setStartAnimations(prevStartAnimations => {
  //         const newStartAnimations = [...prevStartAnimations];
  //         newStartAnimations[i] = false;
  //         return newStartAnimations;
  //       });
  //     }, i * animationDurations[i] * speedBreak);
  //   }
  
  //   return () => timeouts.forEach(timeout => clearTimeout(timeout));
  // }, [numbers, animationDurations, speedBreak]); // Add speedBreak to the dependency array
  
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
        number={numbers[i]} // Przekazanie liczby jako prop
        animationDuration={animationDurations[i]}
        minNumber={minNumber}
        maxNumber={maxNumber}
        handleSliderChange={handleSliderChange}
        displayedNumbersProp={displayedNumbersList[i]}
        onStop={() => stopAnimation(i)}
      />
    );
  }

  return (
    <div>
      <h1>Losowanie Lotto</h1>
      <div className='grido1'>
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
