const mysql = require('mysql2');

// Connection to MySQL Database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username
        user: 'root',
        // MySQL Password
        password: 'password',
        database: 'employee_tracker_tool'
    },
    console.log('Connected to the database.'),
    beginPrompt()
);