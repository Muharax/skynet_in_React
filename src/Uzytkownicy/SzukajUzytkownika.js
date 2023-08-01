import React, { useState, useEffect, useCallback } from 'react';
const URL = 'http://localhost:3001';

function SzukajUzytkownika() {
  const [data, setData] = useState([]); 
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [selectedOption, setSelectedOption] = useState('Imię');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false); // nowy stan dla trybu wyszukiwania

  const fetchUsers = useCallback(async (pageNumber, resultsLimit = limit) => {
    try {
      const response = await fetch(`${URL}/uzytkownicy?page=${pageNumber}&limit=${resultsLimit}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
      });

      const responseData = await response.json();

      if (responseData.data.length < resultsLimit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setData(responseData.data);
      setIsSearching(false); // resetujemy tryb wyszukiwania
      return;
    } catch (error) {
      console.log(`Niepoprawne dane logowania: ${error.message}`);
    }
}, [limit]);

  const nextPage = () => {
    setIsSearching(false); // resetujemy tryb wyszukiwania
    if (hasMore) {
      setPage(page + 1);
    } else {
      alert("Nie ma więcej stron");
    }
  }
  
  const prevPage = () => {
    setIsSearching(false); // resetujemy tryb wyszukiwania
    setPage(page > 1 ? page - 1 : page);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue > 100) {
      const pin = window.prompt('Wprowadź pin');
      if (pin !== '777') {
        return;
      }
    }
    setPage(1);
    setLimit(selectedValue);
    setHasMore(true);
    setIsSearching(false); // resetujemy tryb wyszukiwania
  }

  const handleDelete = async (userIdToDelete, userName) => {
    if (window.confirm(`Czy jesteś pewny, że chcesz usunąć użytkownika ${userName}?`)) {
      const pin = window.prompt('Wprowadź pin');
      const userToken = localStorage.getItem('token');
      try {
        const response = await fetch(`${URL}/usunUzytkownika/${userIdToDelete}`, {  
          method: 'delete',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify({ pin }),
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const data = await response.json();
        if (data.success) {
          alert('Użytkownik został pomyślnie usunięty!');
          setData(currentData => currentData.filter(user => user.id !== userIdToDelete));
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        alert(`Błąd podczas usuwania użytkownika: ${error.message}`);
      }
    }
  }

  const handleSearch = async () => {
    setIsSearching(true); 
    const response = await fetch(`${URL}/wyszukajUzytkownika`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ column: selectedOption, query: searchTerm }),
    });

    const responseData = await response.json();
    if (responseData.data) {
      setData(responseData.data);
    }
  }

  useEffect(() => {
    if (!isSearching) {
      fetchUsers(page); 
    }
  }, [page, limit, fetchUsers, isSearching]);

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

          {/* <select id="opcjeSzukaj" onChange={handleSelectChange}>
            <option>Imię</option>
            <option>Nazwisko</option>
            <option>Data Urodzenia</option>
            <option>Pesel</option>
          </select>
          <input className="wyszukaj" type={inputType} onChange={handleInputChange} />
          <button onClick={handleSearch}>Wyszukaj</button> */}
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
