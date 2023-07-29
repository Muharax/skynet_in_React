const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const generateToken = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

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
  user: 'root',
  password: '',
  database: 'skynet'
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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
      const token = jwt.sign({ id: user.id }, 'tajny_klucz'); // Generowanie tokena JWT
      res.json({ message: `${SYSTEM} Pomyślnie zalogowano.`, token });
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



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});














