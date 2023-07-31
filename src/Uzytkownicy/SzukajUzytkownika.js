import React, { useState, useEffect, useCallback } from 'react';
const URL = 'http://localhost:3001';

function SzukajUzytkownika() {
  const [data, setData] = useState([]); 
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // nowy stan dla limitu
  const [hasMore, setHasMore] = useState(true); // nowy stan dla kontroli dostępności więcej danych
  const [selectedOption, setSelectedOption] = useState('Imię');

  const fetchUsers = useCallback(async (pageNumber) => { // useCallback aby uniknąć ostrzeżenia o braku zależności
    try {
      const response = await fetch(`${URL}/uzytkownicy?page=${pageNumber}&limit=${limit}`, {  // dodany limit do URL
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.data.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setData(responseData.data);
      return;
    } catch (error) {
      console.log(`Niepoprawne dane logowania: ${error.message}`);
    }
  }, [limit]); // dodane limit do zależności useCallback

  const nextPage = () => {
    if (hasMore) { // tylko jeżeli hasMore jest true, zmieniaj stronę
      setPage(page + 1);
    } else {
      alert("Nie ma więcej stron");
    }
  }
  
  const prevPage = () => setPage(page > 1 ? page - 1 : page);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log(selectedValue);
    if (selectedValue > 100) {
      const pin = window.prompt('Wprowadź pin');
      if (pin !== '777') {
        return;
      }
    }
    setPage(1); // resetowanie do pierwszej strony
    setLimit(selectedValue);
    setHasMore(true); // resetowanie hasMore do true
}

  



const handleDelete = async (userIdToDelete, userName) => {
  console.log(`ID DO USUNIĘCIA: ${userIdToDelete}`);
  const confirm = window.confirm(`Czy jesteś pewny, że chcesz usunąć użytkownika ${userName}?`);
  if (confirm) {
    const pin = window.prompt('Wprowadź pin');
    const userToken = localStorage.getItem('token'); // Pobierz token użytkownika
    console.log(`TOKEN ${userToken}`);
    console.log(`Bearer ${userToken}`);
    try {
      const response = await fetch(`${URL}/usunUzytkownika/${userIdToDelete}`, {  
        method: 'delete',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}` // Dodaj token do nagłówków żądania
        },
        body: JSON.stringify({ pin }), // Przesyłanie pin i userId jako ciała żądania
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log(errorMessage);
        alert(`Błąd podczas usuwania użytkownika: ${errorMessage}`);
        return;
      }

      const data = await response.json();

      if (data.success) {
        alert('Użytkownik został pomyślnie usunięty!');
        fetchUsers(page); // Odświeżanie listy użytkowników po usunięciu użytkownika
      } else {
        console.log(data.message);
        alert('Nie udało się usunąć użytkownika.');
      }
    } catch (error) {
      alert(`Błąd podczas usuwania użytkownika: ${error.message}`);
    }
  }
}






  useEffect(() => {
    fetchUsers(page);
  }, [page, limit, fetchUsers]); // dodany fetchUsers do zależności useEffect



  const inputType = selectedOption === 'Data Urodzenia' ? 'date' : 'text';

  return (
        <>
          <div className="vh80 divWithScroll">
            <div className='usersMenu'>
              <button onClick={prevPage}> &lt;</button>
              <button onClick={nextPage}> &gt;</button>
              <select id="liczba" value={limit} onChange={handleSelectChange}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="500">500</option>
              </select>

              <select id="opcjeSzukaj" onChange={handleSelectChange}>
                <option>Imię</option>
                <option>Nazwisko</option>
                <option>Data Urodzenia</option>
                <option>Pesel</option>
              </select>
              <input type={inputType}/>
              <button>Wyszukaj</button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>OPT</th>
                </tr>
              </thead>
              <tbody>
                {data.map((person, index) => (
                  <tr key={index}>
                    <td>{person.id}</td>
                    <td>{person.user}</td>
                    <td>{person.age}</td>
                
                    <td>
                      <button>Edytuj</button>
                      <button value={person.id} onClick={() => handleDelete(person.id, person.user)}>Usuń</button>
                      <button>Zablokuj</button>
                      <select>
                        <option>Dodaj karte</option>
                        <option>RFID</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
  );
};

export default SzukajUzytkownika;
