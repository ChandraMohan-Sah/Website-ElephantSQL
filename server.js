const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const pg = require('pg');
require('dotenv').config();

// Configure ElephantSQL connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});


// Parse JSON request bodies
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'WEBSITE')));


//Server.js ma khasai kaai ni haina 
//particular route/endpoint ma request strik huna ho first ma.
//Then takes request from script.js ....in form of req.body 
//teslai combines with SQL query and send values to database (done by pool.query function)
//if success --Show Success Message
//if Error --Show Error Message



// Add a new user  -- 
app.post('/users', (req, res) => {
  const { name, email, phone } = req.body;
  const query = 'INSERT INTO users (name, email, phone) VALUES ($1, $2, $3)'; //Sql qyery for insertion
  const values = [name, email, phone]; 
  //to pass array values as parameters to the `query(query, values, (err, result) => Function Later ON


  //pool.query is a function that allows you to send SQL queries, and any necessary parameter to the database .
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ message: 'Failed to add user' });
    } else {
      res.status(200).json({ message: 'User added successfully' });
    }

  }); //Closes the callback function for the `query()` function.
}); //Closes the route handler function for the '/users' endpoint.



// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';
  const values = [name, email, id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ message: 'Failed to update user' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  });
});




// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = $1';
  const values = [id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ message: 'Failed to delete user' });
    } else {
      res.status(200).json({ message: 'User deleted successfully' });
    }
  });
});




// Get all users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';

  pool.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ message: 'Failed to fetch users' });
    } else {
      res.status(200).json(result.rows);
    }
  });
});





// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'WEBSITE', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
