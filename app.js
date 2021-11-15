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
                'View All Roles',
                'Add Employee',
                'Add Department',
                'Add Role',
                //'Update Employee Role'

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

            case 'View All Roles':
                viewAllRole();
                break;

            case 'Add Employee':
                addEmployee();
                break;

            case 'Add Department':
                addDepartment();
                break;

            case 'Add Role':
                addRole();
                break;

            //case 'Update Employee Role':
               // updateRole();
             //   break;
        }
    })

}

// View All Employees Function
function viewAllEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.role_title AS role_title, roles.role_salary AS Salary, department.department_name AS Department FROM employee JOIN roles ON employee.roles_id = roles.id JOIN department ON roles.department_id = department.id;`, (err, res) => {

        if (err) throw err
        console.table(res)
        beginPrompt();
    })
}

// View All Departments Function
function viewAllDepartment() {
    db.query(`SELECT department.id, department.department_name AS Departments FROM department;`,(err, res) => {

        if (err) throw err
        console.table(res)
        beginPrompt()
    })
}

// View All Employees + Roles Function
function viewAllRole() {
    db.query(`SELECT roles.id, roles.role_title AS Role_Title FROM roles;`, (err, res) => {

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
           choices: displayRolesQuery()
       }
   ]).then(data => {
       var roleId = displayRolesQuery().indexOf(data.role) + 1
       db.query(`INSERT INTO employee SET ?`,
       {
           first_name: data.first_name,
           last_name: data.last_name,
           roles_id: roleId
       })
       beginPrompt();
   })
   .catch(err => {
    if (err) {
        console.log(err)
        console.table(data)
    }

   });
}

// Function to display roles choices in Add Employee
var roleArr = [];
function displayRolesQuery() {
    db.query(`SELECT * FROM roles`, (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].role_title);
        }
    })
    return roleArr;
}
// Add a Department Function
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Name of department.'
        }
    ]).then(data => {
        db.query(`INSERT INTO department SET ?`,
        {
            department_name: data.department_name
        })
        beginPrompt()
    })
    .catch(err => {
     if (err) {
         console.log(err)
         console.table(data)
     }
 
    });
}

// Add a Role Function
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role_title',
            message: 'Name of Role.'
        },
        {
            type: 'input',
            name: 'role_salary',
            message: 'Salary of Role (Format without $ or ,  e.g. 25000)'
        },
        {
            type: 'list',
            name: 'department_id',
            message: "Which department does this role belong to?",
            choices: displayDepartmentQuery()
        }
    ]).then(data => {
        var departmentId = displayDepartmentQuery().indexOf(data.department_id) + 1
        db.query(`INSERT INTO roles SET ?`,
        {
            role_title: data.role_title,
            role_salary: data.role_salary,
            department_id: departmentId
        })
        beginPrompt()
    })
    .catch(err => {
     if (err) {
         console.log(err)
         console.table(data)
     }
 
    });
}

// Function to display department choices in Add Employee
var departmentArr = [];
function displayDepartmentQuery() {
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            departmentArr.push(res[i].department_name);
        }
    })
    return departmentArr;
}

// Update an Employee's Role
// function updateRole() {
    // console.log('test')
   // beginPrompt();
// }
