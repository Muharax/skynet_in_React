import React, { useState, useEffect } from 'react';
import './test.css';

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
    if (startAnimation) {
      const intervalId = setInterval(() => {
        setDisplayedNumbers(numbers => {
          const firstNumber = numbers.shift();
          return [...numbers, firstNumber];
        });
      }, animationDuration * 5000);
      return () => clearInterval(intervalId);
    }
  }, [startAnimation, animationDuration]);


  return (
    <div style={{ margin: '20px' }}>
      <button onClick={handleStopClick}>Stop</button> {/* Nowy przycisk stop */}
      <div>Speed Break</div>
      <input 
        className='rangeSpeed'
        type="range" 
        min="0.1" 
        max="3" 
        step="0.1" 
        value={animationDuration} 
        onChange={handleSliderChange} 
        orient="vertical"
        style={{writingMode: 'bt-lr'}}
      />
      <div style={{ width: '50px', height: '50px', border: '1px solid black', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        <div 
          className={startAnimation ? 'number-spin' : ''} 
          style={{ 
                  position: 'relative' }}
        >
          {displayedNumbers.map((num, index) => (
            <div className="" key={index} style={{ marginBottom: '2px' }}>{num}</div>
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
  const [animationDurations, setAnimationDurations] = useState([0.5, 0.8, 1, 1.5, 2, 3]);
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(15);
  const [speedBreak, setSpeedBreak] = useState(1000);
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
    const newValue = Number(e.target.value);
    setSpeedBreak(newValue); // Set speedBreak when slider changes
    console.log(newValue);
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
