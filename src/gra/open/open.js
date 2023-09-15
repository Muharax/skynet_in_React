import React, { useState } from 'react';

const getPositiveAmount = () => {
  const amounts = [0.01, 0.02, 0.05, 0.10, 0.20, 0.50, 1.00, 2.00, 5.00];
  const randomIndex = Math.floor(Math.random() * amounts.length);
  return amounts[randomIndex];
}

const getNegativeAmount = () => {
  const amounts = [-0.01, -0.02, -0.05, -0.10, -0.20, -0.50, -1.00, -2.00, -5.00];
  const randomIndex = Math.floor(Math.random() * amounts.length);
  return amounts[randomIndex];
}

const TreeNode = ({ depth, addToTotal }) => {
  const [choice, setChoice] = useState(null);
  const [amount, setAmount] = useState({ left: null, right: null });

  const handleChoice = (direction) => {
    if (choice) return;

    const isLeftPositive = Math.random() < 0.5;
    const selectedAmountLeft = isLeftPositive ? getPositiveAmount() : getNegativeAmount();
    const selectedAmountRight = isLeftPositive ? getNegativeAmount() : getPositiveAmount();

    if (direction === 'left') {
      addToTotal(selectedAmountLeft);
      setAmount(prev => ({ ...prev, left: selectedAmountLeft }));
    } else if (direction === 'right') {
      addToTotal(selectedAmountRight);
      setAmount(prev => ({ ...prev, right: selectedAmountRight }));
    }

    setChoice(direction);
    window.scrollTo(0, document.body.scrollHeight);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button 
        style={{ width: '70px', height: '30px', margin: '10px' }}
        onClick={() => handleChoice('left')}
        disabled={choice === 'right'}
      >
        {amount.left ? `$${amount.left.toFixed(2)}` : 'Lewo'}
      </button>
      <button 
        style={{ width: '70px', height: '30px', margin: '10px' }}
        onClick={() => handleChoice('right')}
        disabled={choice === 'left'}
      >
        {amount.right ? `$${amount.right.toFixed(2)}` : 'Prawo'}
      </button>
    </div>
  );
};


const TreeGame = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [numberOfTickets, setNumberOfTickets] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const addToTotal = (amount) => {
    setTotalAmount(prevTotal => prevTotal + amount);
  };

  const handleReset = () => {
    setTotalAmount(0);
    setNumberOfTickets(null);
    setGameStarted(false);
  };

  return (
    <div>
      <h2>Total Wygrana: ${totalAmount.toFixed(2)}</h2>
      {!gameStarted ? (
        <>
          <p>Wybierz liczbę losów:</p>
          {Array.from({ length: 8 }, (_, i) => i + 3).map(num => (
            <button key={num} onClick={() => setNumberOfTickets(num)}>{num}</button>
          ))}
          {numberOfTickets && (
            <button style={{ display: 'block', marginTop: '20px' }} onClick={() => setGameStarted(true)}>Start</button>
          )}
        </>
      ) : (
        <>
          {Array(numberOfTickets).fill(null).map((_, index) => (
            <TreeNode key={index} addToTotal={addToTotal} />
          ))}
          <button onClick={handleReset} style={{ margin: '10px', display: 'block' }}>Restart</button>
        </>
      )}
    </div>
  );
};

export default TreeGame;
