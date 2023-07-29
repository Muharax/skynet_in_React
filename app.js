const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const SYSTEM = 'SYSTEM :';
const validator = require('validator');
// const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3001;

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
  host: 'mysql.ct8.pl',
  user: 'm37335',
  password: 'nAyF0m_YbnlmN(^X4746KVzhT9gkR&',
  database: 'm37335_skynet'
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

app.post('/login', (req, res) => {
  const { login, pass } = req.body;

  if (!login||!pass) {
    res.json({ message: `${ SYSTEM } Uzupełnij Dane` });
    return;
  }

  const query = 'INSERT INTO messages (msg_user_id, msg_temat, msg_wiadomosc) VALUES (?, ?, ?)';
  db.query(query, [email, temat, wiadomosc], (error, result) => {
    if (error) {
      res.status(500).json({ message: `${ SYSTEM } Błąd podczas zapisywania wiadomości.` });
    } else {
      res.json({ message: `${ SYSTEM } Wiadomość została pomyślnie wysłana.` });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});