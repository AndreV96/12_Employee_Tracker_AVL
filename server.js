//TODO Generate the inquirer questions and functions to navigate the questions
//TODO: Check one more timethe whole mysql module.
//TODO: Create schema.sql file based on the image from the README
//TODO: Create seeds file
//TODO: Create all sql commands for each speficic prompt asked. Use classes for this?
//TODO: Use the console.table package to print MySQL rows to the console.
//TODO: Make README, walkthrough video and upload the project.
//TODO: ****MAKE sure you are using MySQL2 package and console.table package

const inquirer = require('inquirer');

const navigationQuestion = [
  {
    type: "list",
    name: "navigation",
    message:
      "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
  },
]
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
    choices: [],
  },
  {
    type: "list",
    name: "employeeManager",
    message: "Who is the employee's manager?",
    choices: [],
  },
]
const addRoleQuestions = [
  {
    type: "list",
    name: "addRole",
    message: ["What is the name of the role?", "What is the salary of the role?", "Which department does the role belong to?"],
  },
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
    choices: [],
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
    name: "updateRole",
    message: "Which employee's role do you want to update?",
    choices: []
  },
]

// Prompt Question Functions
async function navigationQuest() {
  try {
    console.log('Welcome to the Employee Manager')
    const navigationResponse = await inquirer.prompt([navigationQuestion])
    sendToNextQuestion(navigationResponse);
    // console.log("Finished questions")
  } catch (err) {
    console.log(err);
  }
};
function viewAllEmployees() {
  console.log('All Employees')
  navigationQuest()
};
async function addEmployee() {
  try {
    const employeeResponse = await inquirer.prompt([addEmployeeQuestions])
    navigationQuest()
  } catch (err) {
    console.log(err);
  }
};
async function updateRole() {
  try {
    const roleResponse = await inquirer.prompt([updateRoleQuestion])
    navigationQuest()
  } catch (err) {
    console.log(err);
  }
};
function viewRoles() {
  console.log("All Roles")
  navigationQuest()
}

function sendToNextQuestion(navigationResponse) {
  if (navigationResponse === "View All Employees")
  if (navigationResponse === "Add Employee")
  if (navigationResponse === "Update Employee Role")
  if (navigationResponse === "View All Roles")
  if (navigationResponse === "Add Role")
  if (navigationResponse === "View All Departments")
  if (navigationResponse === "Add Department")
  console.log('Finished with the questions.')
}