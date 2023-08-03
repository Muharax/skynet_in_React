const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const validator = require('validator');
const bcrypt = require('bcrypt');
// import verifyToken from './server/verifyToken';

// const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3001;
const saltRounds = 10;
const SYSTEM = 'SYSTEM :';

// const url = 'mongodb://localhost:27017';
// const dbName = 'users';
// const client = new MongoClient(url);

// client.connect(function(err) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);
// });


const db = mysql.createConnection({
  host: 'localhost',
  user: 'roor',
  password: '',
  database: 'skynet'
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});


db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('MySQL Connected...');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




app.post('/uzytkownicy', (req, res) => { 
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * perPage;

  const query = 'SELECT * FROM users LIMIT ? OFFSET ?';
  db.query(query, [perPage + 1, offset], (error, results) => { // Dodajemy 1 do perPage, aby sprawdzić, czy jest więcej danych
    if (error) {
      res.status(500).json({ message: `Błąd podczas pobierania użytkowników: ${error}` });
      return;
    }

    let hasMore = false;
    if (results.length > perPage) {
      hasMore = true;
      results.pop(); // Usuwamy ostatni element z tablicy, który jest poza wybranym limitem
    }

    res.json({ data: results, hasMore });
  });
});


app.post('/logowanie', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.json({ message: `${SYSTEM} Uzupełnij Dane` });
    return;
  }

  const query = 'SELECT * FROM users WHERE user = ?';
  db.query(query, [username], async (error, results) => {
    if (error) {
      res.status(500).json({ message: `${SYSTEM} Błąd podczas logowania.` });
      return;
    } else if (results.length == 1 ) {
      const user = results[0]; // Wybierz pierwszego znalezionego użytkownika
      const match = await bcrypt.compare(password, user.pass);
      if (match) {
        const token = jwt.sign({ id: user.id, role: user.role, user: user.user }, 'tajny_klucz'); // Generowanie tokena JWT z rolą użytkownika
        // Nowe zapytanie do bazy danych, które zapisuje token, czas logowania oraz aktualizuje ilość logowań
        const updateQuery = 'UPDATE users SET token = ?, dataLogowania = NOW(), iloscLogowan = iloscLogowan + 1 WHERE id = ?';
        db.query(updateQuery, [token, user.id], (updateError, updateResults) => {
          if (updateError) {
            res.status(500).json({ message: `${SYSTEM} Błąd podczas zapisywania tokena.` });
            return;
          }

          res.json({ message: `${SYSTEM} Pomyślnie zalogowano.`, token, username: user.user }); // Zwracamy nazwę użytkownika w odpowiedzi
        });

        return;
      } else {
        res.json({ message: `${SYSTEM} Niepoprawne dane logowania.` });
        return;
      }

    } else {
      res.json({ message: `${SYSTEM} Niepoprawne dane logowania.` });
      return;
    }
  });
});

app.delete('/usunUzytkownika/:id', (req, res) => {
  const { pin, userId } = req.body; // Pobierz pin i userId z ciała żądania
  console.log(`PIN: ${pin}`);
  console.log(`USER_ID: ${userId}`);
  if (!req.headers['authorization']) {
    res.status(400).json({ success: false, message: 'Brak nagłówka Authorization.' });
    return;
  }

  try {
    const token = req.headers['authorization'].split(' ')[1]; // Pobierz token z nagłówków
    const decoded = jwt.verify(token, 'tajny_klucz');
    let id = decoded.id;

    console.log(`ID: ${id}`);
    console.log(`TOKEN: ${token}`);
    console.log(JSON.stringify(decoded, null, 2));

    // Sprawdzanie, czy użytkownik jest zablokowany do usunięcia
    if ([1, 2, 3].includes(Number(req.params.id))) {
      res.status(403).json({ success: false, message: 'Ten użytkownik jest zablokowany.' });
      return;
    }

    // Sprawdzanie, czy token jest prawidłowy
    const checkTokenQuery = 'SELECT id FROM users WHERE id = ? AND token = ?';
    db.query(checkTokenQuery, [id, token], (error, results) => {
      if (error || results.length === 0) {
        res.status(500).json({ success: false, message: 'Niepoprawny token.' });
        return;
      }

      // Sprawdzanie, czy pin jest prawidłowy
      const checkPinQuery = 'SELECT id FROM users WHERE id = ? AND pin = ?';
      db.query(checkPinQuery, [id, pin], (error, results) => {
        if (error || results.length === 0) {
          res.status(500).json({ success: false, message: 'Niepoprawny pin.' });
          return;
        }

        // Usuwanie użytkownika
        const deleteQuery = 'DELETE FROM users WHERE id = ?';
        console.log(`DELETE: ${req.params.id}`);
        db.query(deleteQuery, [req.params.id], (deleteError, deleteResults) => {
          if (deleteError) {
            res.status(500).json({ success: false, message: `Błąd podczas usuwania użytkownika: ${deleteError}` });
            return;
          }

          res.json({ success: true });
        });
      });
    });
    
  } catch(err) {
    console.log(err);
  }
});







app.post('/adduser', async (req, res) => {
  const { user, imie, nazwisko, dataUrodzenia, pesel, adresZamieszkania, adresKorespondencyjny, pass, confirmpass } = req.body;

  console.log(imie);
  console.log(nazwisko);

  if (!req.headers['authorization']) {
    res.status(400).json({ success: false, message: 'Brak nagłówka Authorization.' });
    return;
  }

  if (pass !== confirmpass) {
    res.status(400).json({ success: false, message: 'Hasła nie są takie same.' });
    return;
  }

  try {
    const token = req.headers['authorization'].split(' ')[1]; // Pobierz token z nagłówków
    const decoded = jwt.verify(token, 'tajny_klucz');
    let id = decoded.id;

    const checkTokenQuery = 'SELECT id FROM users WHERE id = ? AND token = ?';
    db.query(checkTokenQuery, [id, token], async (error, results) => {
      if (error || results.length === 0) {
        res.status(500).json({ success: false, message: 'Niepoprawny token.' });
        return;
      }

      const checkUserExistsQuery = 'SELECT id FROM users WHERE user = ?';
      db.query(checkUserExistsQuery, [user], async (error, results) => {
        if (error) {
          res.status(500).json({ success: false, message: 'Błąd zapytania SQL.', error: error });
          return;
        }

        if (results.length > 0) {
          res.status(400).json({ success: false, message: 'Użytkownik o takiej nazwie już istnieje.' });
          return;
        }

        // Hashowanie hasła
        const hashedPassword = await bcrypt.hash(pass, saltRounds);

        const newUser = {
          user,
          imie,
          nazwisko,
          dataUrodzenia,
          pesel,
          adresZamieszkania,
          adresKorespondencyjny,
          pass: hashedPassword  // Zmieniamy oryginalne hasło na zahashowane
        };

        const sql = 'INSERT INTO users SET ?';
        db.query(sql, newUser, (err, result) => {
          if(err) {
            res.status(500).json({ success: false, message: 'Błąd zapytania SQL.', error: err });
            return;
          }
          res.json({ success: true, message: 'User added...' });
        });
      });
    });
  } catch(err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Błąd serwera.', error: err });
  }
});


























  



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
