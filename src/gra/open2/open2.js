import React, { useState, useEffect } from 'react';

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

const Ticket = ({ amount, addToTotal, onSelection, reveal, isGameOver }) => {
  const [revealedAmount, setRevealedAmount] = useState(null);
  const [activatedByPlayer, setActivatedByPlayer] = useState(false);
  const [activatedAfterGame, setActivatedAfterGame] = useState(false);

  const handleClick = () => {
    if (revealedAmount) return;

    setRevealedAmount(amount);

    if (isGameOver) {
      setActivatedAfterGame(true);
    } else {
      addToTotal(amount);
      onSelection();
      setActivatedByPlayer(true);
    }
  }

  const determineBackgroundColor = () => {
    if (activatedByPlayer) return 'green';
    if (activatedAfterGame || reveal) return 'orange';
    return 'initial';
  }

  return (
    <button 
      onClick={handleClick} 
      style={{ width: '70px', height: '30px', margin: '5px', backgroundColor: determineBackgroundColor() }}
    >
      {(revealedAmount || reveal) ? `$${(amount || 0).toFixed(2)}` : 'LOS'}
    </button>
  );
};

const TOTAL_BUTTONS = 50;

const TreeGame2 = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [numberOfTickets, setNumberOfTickets] = useState(null);
  const [selectedTickets, setSelectedTickets] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [ticketAmounts, setTicketAmounts] = useState([]);
  const [revealAll, setRevealAll] = useState(false);

const handleRevealAll = () => {
  setRevealAll(true);
};


  useEffect(() => {
    const amounts = Array.from({ length: TOTAL_BUTTONS }).map(() => {
      const isPositive = Math.random() < 0.5;
      return isPositive ? getPositiveAmount() : getNegativeAmount();
    });
    setTicketAmounts(amounts);
  }, [numberOfTickets]);

  const addToTotal = (amount) => {
    setTotalAmount(prevTotal => prevTotal + amount);
  };

  const handleTicketSelection = () => {
    setSelectedTickets(prev => prev + 1);
    if (selectedTickets + 1 >= numberOfTickets) {
      setGameOver(true);
    }
  };

  const handleReveal = () => {
    setReveal(true);
  };

  const handleReset = () => {
    setTotalAmount(0);
    setSelectedTickets(0);
    setNumberOfTickets(null); // Tutaj resetujemy wartość numberOfTickets do null
    setGameOver(false);
    setReveal(false);
    setRevealAll(false);  // Dodaj również resetowanie tej wartości
  };
  

  return (
    <div>
      <h2>Total Wygrana: ${totalAmount.toFixed(2)}</h2>
      {numberOfTickets && <p>Dostępne losy: {numberOfTickets - selectedTickets}</p>}
      {numberOfTickets && (
        <div>
          {Array.from({ length: TOTAL_BUTTONS }).map((_, index) => (
            <Ticket 
              key={index} 
              amount={ticketAmounts[index]} 
              addToTotal={addToTotal} 
              onSelection={handleTicketSelection} 
              reveal={revealAll}
              isGameOver={gameOver}
            />
          ))}
        </div>
      )}

      {gameOver ? (
        <>
          <h3>Twoja wygrana to: ${totalAmount.toFixed(2)}</h3>
          <button onClick={handleReset} style={{ display: 'block', marginTop: '20px' }}>Restart</button>
          {!revealAll && <button onClick={handleRevealAll} style={{ display: 'block', marginTop: '20px' }}>Odkryj</button>}
        </>
      ) : (
        !numberOfTickets && (  // <-- Dodajemy tutaj warunek
          <div>
            <p>Wybierz liczbę losów:</p>
            {Array.from({ length: 8 }, (_, i) => i + 3).map(num => (
              <button key={num} onClick={() => setNumberOfTickets(num)} style={{ margin: '5px' }}>{num}</button>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default TreeGame2;
