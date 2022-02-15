
//TODO: Make README, walkthrough video and upload the project.
const inquirer = require("inquirer");
const cTable = require("console.table");
const queries = require("./queries");

const navigationQuestion = [
  {
    type: "list",
    name: "navigation",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  },
];
const addDepartmentQuestion = [
  {
    type: "input",
    name: "name",
    message: "What is the name of the department?",
  },
];

// Prompt Question Functions
async function navigationQuest() {
  try {
    const prompt = await inquirer.prompt(navigationQuestion);
    const response = prompt.navigation;
    if (response === "View All Employees") viewAllEmployees();
    if (response === "Add Employee") addEmployee();
    if (response === "Update Employee Role") updateRole();
    if (response === "View All Roles") viewAllRoles();
    if (response === "Add Role") addRole();
    if (response === "View All Departments") viewAllDepartments();
    if (response === "Add Department") addDepartment();
    if (response === "Quit") console.log("Finished questions");
  } catch (err) {
    console.log(err);
  }
}

//View All Prompts

async function viewAllEmployees() {
  try {
    const data = await queries.viewAllEmployees();
    console.table(data[0]);
    navigationQuest();
  } catch (err) {
    console.log(err);
  }
}
async function viewAllRoles() {
  try {
    const data = await queries.viewAllRoles();
    console.table(data[0]);
    navigationQuest();
  } catch (err) {
    console.log(err);
  }
}
async function viewAllDepartments() {
  try {
    const data = await queries.viewAllDepartments();
    console.table(data[0]);
    navigationQuest();
  } catch (err) {
    console.log(err);
  }
}

//Add Prompts

async function addEmployee() {
  try {
    const employeeData = await queries.viewAllEmployees();
    const roleData = await queries.viewAllRoles();
    const employeeNamesArr = employeeData[0].map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
    const employeeRolesArr = roleData[0].map((role) => ({
      name: role.title,
      value: role.id
    }));
    const addEmployeeQuestions = [
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: employeeRolesArr,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is the employee's manager?",
        choices: employeeNamesArr,
      },
    ];
    const response = await inquirer.prompt(addEmployeeQuestions);
    await queries.addEmployee(response);
    navigationQuest();
  } catch (err) {
    console.log(err);
  }
}
async function addRole() {
  try {
    const departmentData = await queries.viewAllDepartments();
    const departmentArr = departmentData[0].map(department => ({
      name: department.name,
      value: department.id
    }));
    const addRoleQuestions = [
      {
        type: "input",
        name: "title",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentArr,
      },
    ];
    const addRoleResponse = await inquirer.prompt(addRoleQuestions);
    await queries.addRole(addRoleResponse);
    navigationQuest();
  } catch (err) {
    console.log(err);
  }
}
async function addDepartment() {
  try {
    const addDepartmentResponse = await inquirer.prompt(addDepartmentQuestion);
    await queries.addDepartment(addDepartmentResponse);
    navigationQuest();
  } catch (err) {
    console.log(err);
  }
}
async function updateRole() {
  try {
    const employeeData = await queries.viewAllEmployees();
    const roleData = await queries.viewAllRoles();
    const employeeArr = employeeData[0].map(
      (employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }) 
    );
    const roleArr = roleData[0].map((role) => ({
      name: role.title,
      value: role.id
    }));
    const updateRoleQuestion = [
      {
        type: "list",
        name: "id",
        message: "Which employee do you want to update?",
        choices: employeeArr,
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the new role?",
        choices: roleArr,
      },
    ];
    const updateRoleResponse = await inquirer.prompt(updateRoleQuestion);
    queries.updateRole(updateRoleResponse);
    navigationQuest();
  } catch (err) {
    console.log(err);
  }
}

// Initialize server
function init() {
  console.log("Welcome to the Employee Manager");
  navigationQuest();
}

init();
