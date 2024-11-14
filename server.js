require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'facebook_clone'
});

db.connect((err) => {
  if (err) {
    console.log('Database connection error:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

// Signup route
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
  
    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Directly save user to the database without hashing the password
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error saving user' });
      }
      res.status(201).json({ message: 'User registered successfully!' });
    });
  });
  

  //l;l;
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Directly save user to the database without hashing the password
    const query = 'INSERT INTO users1 (email, password) VALUES ( ?, ?)';
    db.query(query, [email, password], (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error saving user' });
      }
      res.status(201).json({ message: 'User registered successfully!' });
    });
  });
  

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Both email and password are required----------' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];

    // Compare the password
    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      // res.status(200).json({ message: 'Login successful!' });
    });
  });
});


//Route to get the last user's login data
// app.get('/last-login', (req, res) => {
//   const query = 'SELECT email, password FROM users ORDER BY id DESC LIMIT 1'; // Adjust `id` to match your unique identifier
  
//   db.query(query, (error, result) => {
//     if (error) {
//       return res.status(500).json({ message: 'Error retrieving last login data' });
//     }
//     if (result.length === 0) {
//       return res.status(404).json({ message: 'No users found' });
//     }
//     res.status(200).json(result[0]);
//   });
// });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
