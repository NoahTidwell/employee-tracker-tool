DROP DATABASE IF EXISTS employee_tracker_tool;
CREATE DATABASE employee_tracker_tool;
USE employee_tracker_tool;

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    role_title VARCHAR(30) NOT NULL,
    role_salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE NO ACTION
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INTEGER NOT NULL,
    manager_id INTEGER NOT NULL,
    CONSTRAINT fk_roles_id FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE NO ACTION,
    CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE NO ACTION
);






