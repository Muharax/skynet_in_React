import React, { useState, useEffect } from 'react';

const generateShuffledNumbers = (min, max) => {
  let numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
};

const Losowanie2 = () => {
  const [displayedNumbers, setDisplayedNumbers] = useState(generateShuffledNumbers(1, 49).slice(0, 5));
  const [animationSpeed, setAnimationSpeed] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        let newNumbers = generateShuffledNumbers(1, 49);
        setDisplayedNumbers((prevNumbers) => [
          newNumbers[0],
          ...prevNumbers.slice(0, prevNumbers.length - 1),
        ]);
      }, animationSpeed);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, animationSpeed]);

  const startAnimation = () => {
    setIsRunning(true);
  };

  const stopAnimation = () => {
    setIsRunning(false);
  };

  return (
    <div style={{ margin: '20px' }}>
      <div>Speed Break</div>
      <input
        className="rangeSpeed"
        type="range"
        min="1"
        max="5"
        step="0.1"
        value={animationSpeed / 1000}
        onChange={(e) => setAnimationSpeed(e.target.value * 1000)}
        orient="vertical"
        style={{ writingMode: 'bt-lr' }}
      />
      <div
        style={{
          width: '50px',
          height: '100px',
          border: '1px solid black',
          backgroundColor: '#eee',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {displayedNumbers.map((number, index) => (
          <div key={index} style={{ height: '20px' }}>
            {number}
          </div>
        ))}
      </div>
      <button onClick={startAnimation}>Start</button>
      <button onClick={stopAnimation}>Stop</button>
    </div>
  );
};

export default Losowanie2;
