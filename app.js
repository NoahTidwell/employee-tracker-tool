const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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
    console.log(`
    ================== ================== ==================
    Yay! Connection to the mySQL database is successful.
    ================== ================== ==================`),
    beginPrompt()
);

// Inquirer Prompt
function beginPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to start with?',
            name: 'initChoice',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Employees + Roles',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager'

            ]
        }
    ]).then( answers => {
        switch(answers.initChoice) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            
            case 'View All Departments':
                viewAllDepartment();
                break;

            case 'View All Employees + Roles':
                viewAllRole();
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
    .catch(err => {
        console.log(err);
    });
}

// View All Employees Function
function viewAllEmployees() {
    db.query(`SELECT employee.first_name, employee.last_name FROM employee;`, 
    function (err, res) {
        if (err) throw err
        console.table(res)
        beginPrompt();
    })
}

// View All Departments Function
function viewAllDepartment() {
    db.query(`SELECT department.department_name AS Department FROM department;`,
    function (err, res) {
        if (err) throw err
        console.table(res)
        beginPrompt()
    })
}

// View All Employees + Roles Function
function viewAllRole() {
    db.query(`SELECT employee.first_name, employee.last_name, roles.role_title AS role_title FROM employee JOIN roles ON employee.roles_id = roles.id;`, 
    function (err, res) {
        if (err) throw err
        console.table(res)
        beginPrompt()
    })
}

// Add an Employee Function
function addEmployee() {
   inquirer.prompt([
       {
           type: 'input',
           name: 'first_name',
           message: 'First Name of the Employee.'
       },
       {
           type: 'input',
           name: 'last_name',
           message: 'Last Name of the Employee.'
       },
       {
           type: 'list',
           name: 'role',
           message: "What is this employee's new role?",
           choices: ['Backend Engineer', 'Frontend Engineer', 'Lead Engineer', 'Sales Associate', 'Head of Sales', 'Attorny', 'President']
       }
   ]).then(function(data) {
       db.query(`INSERT INTO employee SET ?`,
       {
           first_name: data.first_name,
           last_name: data.last_name,
           role: data.role
       }

       )}
   )};

// Remove an Employee Function
function removeEmployee() {
    console.log('test');
}

// Update an Employee's Manager
function updateManager() {
    console.log('test');
}

// Update an Employee's Role
function updateRole() {
    console.log('test');
}