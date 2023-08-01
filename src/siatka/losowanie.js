import React, { useState, useEffect, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const speed = 90;

function Losowanie2() {
  const [numbers, setNumbers] = useState([]);
  const [isRunning, setIsRunning] = useState(false); 
  const intervalId = useRef(null); 

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    if(numbers.includes(randomNumber)) {
      return generateRandomNumber();
    }

    setNumbers(prevNumbers => {
      if (prevNumbers.length >= 5) {
        return [...prevNumbers.slice(1), randomNumber];
      } 

      return [...prevNumbers, randomNumber];
    });
  }

  const handleButtonClick = () => {
    setIsRunning(!isRunning);
  }

  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(generateRandomNumber, speed);
    } else {
      // If the generating is running, stop the generating
      if (intervalId.current) clearInterval(intervalId.current);
    }
  }, [isRunning]); 

  useEffect(() => {
    for(let i = 0; i < 5; i++) {
      generateRandomNumber();
    }
  }, []);

  return (
    <div className='zaLeb'>
      <button onClick={handleButtonClick}>{isRunning ? 'STOP' : 'START'}</button>
      <TransitionGroup component={null}>
        {numbers.map((number, index) => (
          <CSSTransition key={index} timeout={500} classNames='move'>
            <div 
              key={index} 
              className={`number-div  ${

                    index === 1 ? 'special-up number-animation' :
                    index === 2 ? 'special-div number-animation' : 
                    index === 3 ? 'special-down number-animation' : ''

                  }`}>
              {number}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default Losowanie2;
