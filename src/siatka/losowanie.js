import React, { useState, useEffect, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const speed = 60;
const LOOPS_COUNT = 6;
const min = 1;
const max = 49;
const stopDelayMin = 100;
const stopDelayMax = 300;

function Losowanie2() {
  const [numbersSets, setNumbersSets] = useState(Array(LOOPS_COUNT).fill([]));
  const [isRunningSets, setIsRunningSets] = useState(Array(LOOPS_COUNT).fill(false));
  const intervalIds = useRef(Array(LOOPS_COUNT).fill(null));
  const [previousSpecialNumbers, setPreviousSpecialNumbers] = useState([]);

  const generateRandomNumber = (excludedNumbers = []) => {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (excludedNumbers.includes(randomNumber));
    return randomNumber;
  }

  const generateRandomNumberFromPool = (pool) => {
    const index = Math.floor(Math.random() * pool.length);
    const chosenNumber = pool[index];
    pool.splice(index, 1);
    return chosenNumber;
  }

  const generateVisualSet = (specialNumber) => {
    const visualNumbers = [];
    while (visualNumbers.length < 4) {
      const randNum = generateRandomNumber([...visualNumbers, specialNumber]);
      visualNumbers.push(randNum);
    }
    visualNumbers.splice(2, 0, specialNumber); // Wstawia specialNumber jako trzeci element
    return visualNumbers;
  }

  useEffect(() => {
    const pool = Array.from({length: max - min + 1}, (_, i) => i + min);
    const specialNumbers = [];
    for (let i = 0; i < LOOPS_COUNT; i++) {
      const specialNumber = generateRandomNumberFromPool(pool);
      specialNumbers.push(specialNumber);
    }

    const initialSets = specialNumbers.map(sn => generateVisualSet(sn));
    setNumbersSets(initialSets);

    const storedSpecialNumbers = localStorage.getItem('specialNumbers');
    if (storedSpecialNumbers) {
      setPreviousSpecialNumbers(JSON.parse(storedSpecialNumbers));
    }
  }, []);

  const handleSingleButtonClick = (index) => {
    setIsRunningSets(prev => {
      const newRunningSets = [...prev];
      newRunningSets[index] = !newRunningSets[index];
      return newRunningSets;
    });
  }

  const handleAllStartClick = () => {
    setIsRunningSets(Array(LOOPS_COUNT).fill(true));
  }

  const handleAllStopClick = () => {
    setIsRunningSets(Array(LOOPS_COUNT).fill(false));
    setTimeout(() => {
      const currentSpecialNumbers = numbersSets.map(set => set[2]);
      const updatedSpecialNumbers = [currentSpecialNumbers, ...previousSpecialNumbers].slice(0, 6);
      localStorage.setItem('specialNumbers', JSON.stringify(updatedSpecialNumbers));
      setPreviousSpecialNumbers(updatedSpecialNumbers);
    }, Math.floor(Math.random() * (stopDelayMax - stopDelayMin + 1)) + stopDelayMin);
  }

  useEffect(() => {
    numbersSets.forEach((_, index) => {
      if (isRunningSets[index]) {
        if (intervalIds.current[index]) clearInterval(intervalIds.current[index]);
        intervalIds.current[index] = setInterval(() => {
          setNumbersSets(prevSets => {
            const updatedSet = [...prevSets[index].slice(1), prevSets[index][0]];
            const newSets = [...prevSets];
            newSets[index] = updatedSet;
            return newSets;
          });
        }, speed);
      } else {
        if (intervalIds.current[index]) clearInterval(intervalIds.current[index]);
      }
    });
  }, [isRunningSets]);

  return (
    <div className='srodekK'>
      <div className='zaLeb'>
        <button onClick={handleAllStartClick}>START ALL</button>
        <button onClick={handleAllStopClick}>STOP ALL</button>

        {numbersSets.map((numbers, setIndex) => (
          <div className="losowanieR" key={setIndex}>
            <button className="btnStartStop" onClick={() => handleSingleButtonClick(setIndex)}>
              {isRunningSets[setIndex] ? 'STOP' : 'START'}
            </button>
            <TransitionGroup component={null}>
              {numbers.map((number, index) => (
                <CSSTransition key={index} timeout={500} classNames='move'>
                  <div 
                    key={index} 
                    className={`number-div ${
                      index === 2 ? 'special-div number-animation' : ''
                    }`}>
                    {number}
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        ))}

        <table>
          <thead>
            <tr>
              {Array.from({ length: LOOPS_COUNT }).map((_, i) => (
                <th key={i}>Losowanie {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previousSpecialNumbers.map((draw, drawIndex) => (
              <tr key={drawIndex}>
                {draw.map((number, setIndex) => (
                  <td key={setIndex}>{number}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Losowanie2;
