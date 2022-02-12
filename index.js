//TODO  Connect the role/employee/department questions with the corresponding tables
//TODO: Create all sql commands for each speficic prompt asked. Use classes for this?
//TODO: Use the console.table package to print MySQL rows to the console.
//TODO: Make README, walkthrough video and upload the project.
//TODO: ****MAKE sure you are using MySQL2 package and console.table package

const inquirer = require('inquirer');
const cTable = require("console.table");
const queries = require("./queries")

const navigationQuestion = [
  {
    type: "list",
    name: "navigation",
    message:
      "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
  },
]

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
    choices: ["a"],
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
    
    const data = await queries.viewAllEmployees()
    const employeeNamesArr = data[0].map(employee => `${employee.first_name} ${employee.last_name}`)
    const employeeRolesArr = data[0].map(employee => employee.title)
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
    console.log(response)
    // CONTINUE HERE YOU NEED TO DO THE QUERY TO ADD NEW EMPLOYEE
    // navigationQuest()
  } catch (err) {
    console.log(err);
  }
};

async function addDepartment() {
  try {

  } catch (err) {
    console.log(err)
  }
}
async function updateRole() {
  try {
    const updateRoleResponse = await inquirer.prompt(updateRoleQuestion)

  } catch (err) {
    console.log(err);
  }
};
async function addRole() {
  try {
    const addRoleResponse = await inquirer.prompt(addRoleQuestions)

  } catch (err) {
    console.log(err)
  }
};
async function addDepartment() {
  try {
    const addDepartmentRespone = await inquirer.prompt(addDepartmentQuestion)

  } catch (err) {
    console.log(err)
  }
}

// function sendToNextQuestion(navigationResponse) {
//   if (navigationResponse === "View All Employees") viewAllEmployees()
//   if (navigationResponse === "Add Employee") addEmployee()
//   if (navigationResponse === "Update Employee Role") updateRole()
//   if (navigationResponse === "View All Roles") viewAllRoles()
//   if (navigationResponse === "Add Role") addRole()
//   if (navigationResponse === "View All Departments") viewAllDepartments()
//   if (navigationResponse === "Add Department") addDepartment()
//   if (navigationResponse === "Quit") console.log('Finished questions')
// }

// Initialize server
function init() {
  console.log('Welcome to the Employee Manager')
  navigationQuest()
}

init()
