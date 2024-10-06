// db/queries.js
const db = require('./db');

// View all departments
async function getAllDepartments() {
  const res = await db.query('SELECT * FROM department');
  return res.rows;
}

// View all roles
async function getAllRoles() {
  const res = await db.query(`
    SELECT role.id, role.title, role.salary, department.name AS department 
    FROM role 
    JOIN department ON role.department_id = department.id
  `);
  return res.rows;
}

// View all employees
async function getAllEmployees() {
  const res = await db.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager 
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id 
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `);
  return res.rows;
}

// Add a department
async function addDepartment(name) {
  await db.query('INSERT INTO department (name) VALUES ($1)', [name]);
}

// Add a role
async function addRole(title, salary, department_id) {
  await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
}

// Add an employee
async function addEmployee(first_name, last_name, role_id, manager_id) {
  await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
}

// Update employee role
async function updateEmployeeRole(employee_id, role_id) {
  await db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
}

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
