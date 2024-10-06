// app.js
const inquirer = require('inquirer');
const dbQueries = require('./db/queries');  // Import the database queries

async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update employee role',
        'Exit'
      ]
    }
  ]);

  switch (action) {
    case 'View all departments':
      return viewDepartments();
    case 'View all roles':
      return viewRoles();
    case 'View all employees':
      return viewEmployees();
    case 'Add a department':
      return addDepartment();
    case 'Add a role':
      return addRole();
    case 'Add an employee':
      return addEmployee();
    case 'Update employee role':
      return updateEmployeeRole();
    default:
      console.log('Goodbye!');
      process.exit();
  }
}

async function viewDepartments() {
  const departments = await dbQueries.getAllDepartments();
  console.table(departments);
  mainMenu();
}

async function viewRoles() {
  const roles = await dbQueries.getAllRoles();
  console.table(roles);
  mainMenu();
}

async function viewEmployees() {
  const employees = await dbQueries.getAllEmployees();
  console.table(employees);
  mainMenu();
}

async function addDepartment() {
  const { name } = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Enter department name:' }
  ]);
  
  await dbQueries.addDepartment(name);
  console.log(`Added department: ${name}`);
  mainMenu();
}

async function addRole() {
  const departments = await dbQueries.getAllDepartments();
  const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));

  const { title, salary, department_id } = await inquirer.prompt([
    { type: 'input', name: 'title', message: 'Enter role title:' },
    { type: 'input', name: 'salary', message: 'Enter role salary:' },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select department:',
      choices: departmentChoices
    }
  ]);

  await dbQueries.addRole(title, salary, department_id);
  console.log(`Added role: ${title}`);
  mainMenu();
}

async function addEmployee() {
  const roles = await dbQueries.getAllRoles();
  const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

  const employees = await dbQueries.getAllEmployees();
  const managerChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
  managerChoices.unshift({ name: 'None', value: null });

  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    { type: 'input', name: 'first_name', message: 'Enter first name:' },
    { type: 'input', name: 'last_name', message: 'Enter last name:' },
    { type: 'list', name: 'role_id', message: 'Select role:', choices: roleChoices },
    { type: 'list', name: 'manager_id', message: 'Select manager:', choices: managerChoices }
  ]);

  await dbQueries.addEmployee(first_name, last_name, role_id, manager_id);
  console.log(`Added employee: ${first_name} ${last_name}`);
  mainMenu();
}

async function updateEmployeeRole() {
  const employees = await dbQueries.getAllEmployees();
  const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

  const roles = await dbQueries.getAllRoles();
  const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

  const { employee_id, role_id } = await inquirer.prompt([
    { type: 'list', name: 'employee_id', message: 'Select employee:', choices: employeeChoices },
    { type: 'list', name: 'role_id', message: 'Select new role:', choices: roleChoices }
  ]);

  await dbQueries.updateEmployeeRole(employee_id, role_id);
  console.log('Updated employee role');
  mainMenu();
}

mainMenu();
