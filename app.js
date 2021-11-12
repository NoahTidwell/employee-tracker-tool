const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connection to MySQL Database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee-tracker-tool-db'
});

// Inquirer Prompt
function startTool() {
    
}