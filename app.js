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
function beginPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to start with?',
            name: 'first-choice',
            choices: [
                'View All Employees',
                'View All Employees by Department',
                'View All Employees by Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager'

            ]
        }
    ]).then((data) => {
        switch (data.choice) {
            case 'View All Employees':
                viewAllEmployees();
                break;

            case 'View All Employees by Department':
                viewByDepartment();
                break;
            
            case 'View All Employees by Manager':
                viewByManager();
                break;

            case 'Add Employee':
                addEmployee();
                break;

            case 'Remove Employee':
                removeEmployee();
                break;

            case 'Update Employee Role':
                updateRole();
                break;

            case 'Update Employee Manager':
                updateManager();
                break;
        }
    })
}

// View All Employees Function
function viewAllEmployees() {

}

// View All Employees by Department Function
function viewByDepartment() {

}

// View All Employees by Manager Function
function viewByManager() {

}

// Add an Employee Function
function addEmployee() {

}

// Remove an Employee Function
function removeEmployee() {

}

// Update an Employee's Manager
function updateManager() {

}

// Update an Employee's Role
function updateRole() {

}