//TODO  Connect the role/employee/department questions with the corresponding tables
//TODO: Create all sql commands for each speficic prompt asked. Use classes for this?
//TODO: Use the console.table package to print MySQL rows to the console.
//TODO: Make README, walkthrough video and upload the project.
//TODO: ****MAKE sure you are using MySQL2 package and console.table package

const inquirer = require('inquirer');
const cTable = require("console.table");
const queries = require("./queries");
const e = require('express');

const navigationQuestion = [
  {
    type: "list",
    name: "navigation",
    message:
      "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
  },
]

const addDepartmentQuestion = [
  {
    type: "input",
    name: "departmentName",
    message: "What is the name of the department?",
  },
]
const updateRoleQuestion = [
  {
    type: "list",
    name: "updateRoleEmployee",
    message: "Which employee do you want to update?",
    choices: ["a"],
  },
  {
    type: "list",
    name: "updateRoleNewRole",
    message: "What is the new role?",
    choices: ["a"],
  },
]

// Prompt Question Functions
async function navigationQuest() {
  try {
    const prompt = await inquirer.prompt(navigationQuestion)
    const response = prompt.navigation
    if (response === "View All Employees") viewAllEmployees()
    if (response === "Add Employee") addEmployee()
    if (response === "Update Employee Role") updateRole()
    if (response === "View All Roles") viewAllRoles()
    if (response === "Add Role") addRole()
    if (response === "View All Departments") viewAllDepartments()
    if (response === "Add Department") addDepartment()
    if (response === "Quit") console.log('Finished questions')

  } catch (err) {
    console.log(err);
  }
};

//View All Prompts

async function viewAllEmployees() {
  try {
    const data = await queries.viewAllEmployees()
    console.table(data[0])
    navigationQuest()
  } catch (err) {
    console.log(err);
  }
};
async function viewAllRoles() {
  try {
    const data = await queries.viewAllRoles()
    console.table(data[0])
    navigationQuest()
  } catch (err) {
    console.log(err);
  }
};
async function viewAllDepartments() {
  try {
    const data = await queries.viewAllDepartments()
    console.table(data[0])
    navigationQuest()
  } catch (err) {
    console.log(err);
  }
};

//Add Prompts

async function addEmployee() {
  try {
    const employeeData = await queries.viewAllEmployees()
    const roleData = await queries.viewAllRoles()
    const employeeNamesArr = employeeData[0].map(employee => `${employee.first_name} ${employee.last_name}`)
    const employeeRolesArr = roleData[0].map(role => role.title)
    const addEmployeeQuestions = [
      {
        type: "input",
        name: "employeeFirstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "employeeLastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "employeeRole",
        message: "What is the employee's role?",
        choices: [...employeeRolesArr],
      },
      {
        type: "list",
        name: "employeeManager",
        message: "Who is the employee's manager?",
        choices: [...employeeNamesArr],
      },
    ]
    const response = await inquirer.prompt(addEmployeeQuestions)
     await queries.addEmployee(response, employeeData, roleData)
    navigationQuest()
  } catch (err) {
    console.log(err);
  }
};
async function addRole() {
  try {
    const departmentData = await queries.viewAllDepartments()
    const departmentArr = departmentData[0].map(department => department.name)
    const addRoleQuestions = [
      {
        type: "input",
        name: "roleName",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "roleDepartment",
        message: "Which department does the role belong to?",
        choices: [...departmentArr],
      },
    ]
    const addRoleResponse = await inquirer.prompt(addRoleQuestions)
    await queries.addRole(addRoleResponse, departmentData)
    navigationQuest()
  } catch (err) {
    console.log(err)
  }
};
async function addDepartment() {
  try {
    const addDepartmentResponse = await inquirer.prompt(addDepartmentQuestion)
    await queries.addDepartment(addDepartmentResponse)
    navigationQuest()
  } catch (err) {
    console.log(err)
  }
}
//  function updateRole() {
//   try {
//     const updateRoleResponse = await inquirer.prompt(updateRoleQuestion)

//   } catch (err) {
//     console.log(err);
//   }
// };

// Initialize server
function init() {
  console.log('Welcome to the Employee Manager')
  navigationQuest()
}

init()
