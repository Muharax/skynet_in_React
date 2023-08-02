import React, { useState } from "react";

const Test2 = () => {
  const [divs, setDivs] = useState([1, 2, 3, 4, 5]);
  const [nextNum, setNextNum] = useState(6);
  const [inputValue, setInputValue] = useState("30");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    const numDivsToProcess = parseInt(inputValue, 10);

    if (!isNaN(numDivsToProcess) && numDivsToProcess > 0) {
      let i = 0;
      let currentNum = nextNum;

      const processDiv = () => {
        setDivs(prevDivs => {
          const newDivs = [...prevDivs];
          newDivs.pop(); // usuwamy jeden div
          newDivs.unshift(currentNum + i); // dodajemy nowy div na początek
          return newDivs;
        });

        i += 1;
        if (i < numDivsToProcess) {
          setTimeout(processDiv, 70); // wywołujemy tę samą funkcję z opóźnieniem, jeśli jeszcze nie przetworzyliśmy wszystkich divów
        } else {
          setNextNum(currentNum + i); // zwiększamy liczbę dla następnych divów tylko po zakończeniu procesu
        }
      };

      processDiv(); // wywołujemy funkcję po raz pierwszy
    }
  };

  return (
    <div>
      <input type="number" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Usunąć i dodać div</button>
      {divs.map((num, i) => (
        <div key={i} className="vafer" style={{ height: "50px", width: "50px", backgroundColor: "lightblue", margin: "5px" }}>
          {num}
        </div>
      ))}
    </div>
  );
};
export default Test2;
