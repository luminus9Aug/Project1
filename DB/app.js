require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12728310',
    password: 'NLS7xz9NVm',
    database: 'sql12728310',
    port: 3306
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);
});

// API Routes

// Customer Signup
app.post('/api/signup/customer', (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const role = 'customer'; // Default role

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const sql = 'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, email, password, role], (err, result) => {
        if (err) {
            console.error('Error creating customer: ' + err.stack);
            return res.status(500).json({ error: 'Failed to create customer.' });
        }
        res.status(201).json({ message: 'Customer created successfully.', userId: result.insertId });
    });
});


// Admin Signup
app.post('/api/signup/admin', (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const role = 'admin'; // Default role

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const sql = 'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, email, password, role], (err, result) => {
        if (err) {
            console.error('Error creating admin: ' + err.stack);
            return res.status(500).json({ error: 'Failed to create admin.' });
        }
        res.status(201).json({ status: 200, message: 'Admin created successfully.', userId: result.insertId });
    });
});

// Customer Login
app.post('/api/login/customer', (req, res) => {
    const { email, password } = req.body;
    const role = 'customer'; // Role to check

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ? AND role = ?';
    db.query(sql, [email, password, role], (err, results) => {
        if (err) {
            console.error('Error during customer login: ' + err.stack);
            return res.status(500).json({ error: 'Failed to login customer.' });
        }

        if (results.length > 0) {
            res.status(200).json({ message: 'Customer logged in successfully.', user: results[0] });
        } else {
            res.status(401).json({ error: 'Invalid credentials or role.' });
        }
    });
});

// Admin Login
app.post('/api/login/admin', (req, res) => {
    const { email, password } = req.body;
    const role = 'admin'; // Role to check

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error during admin login: ' + err.stack);
            return res.status(500).json({ error: 'Failed to login admin.' });
        }

        if (results.length === 0) {
            // No matching user found
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const user = results[0];
        if (user.role !== role) {
            // User exists but role does not match
            return res.status(403).json({ status: 403, error: 'You are not allowed to login from here' });
        }

        // Credentials and role match
        res.status(200).json({ status: 200, message: 'Admin logged in successfully.', user });
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
