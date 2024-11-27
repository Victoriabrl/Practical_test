
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;


app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '6sRKvUd.20220633',
    database: 'my_database'
});


db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});


app.post('/add', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error adding user', error: err });
        } else {
            res.status(201).send({ message: 'User added successfully', userId: result.insertId });
        }
    });
});


app.get('/records', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching records', error: err });
        } else {
            res.status(200).json(results);
        }
    });
});


app.get('/record/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching record', error: err });
        } else if (result.length === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).json(result[0]);
        }
    });
});

// Update (PUT) - Update user by id
/*app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(query, [name, email, id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error updating user', error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send({ message: 'User updated successfully' });
        }
    });
});*/

// Delete (DELETE) - Delete user by id
   /* app.delete('/delete/:id', (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                res.status(500).send({ message: 'Error deleting user', error: err });
            } else if (result.affectedRows === 0) {
                res.status(404).send({ message: 'User not found' });
            } else {
                res.status(200).send({ message: 'User deleted successfully' });
            }
        });
    });*/

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
