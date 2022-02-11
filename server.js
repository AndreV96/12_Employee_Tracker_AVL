const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

require('dotenv').config();

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the employees database.`)
)

//The View All queries

function viewAllEmployees() {
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title as title, department.name as department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) as manager
  FROM employee
  
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id
  LEFT Join employee manager ON employee.manager_id = manager.id;`,
   (err, result)=> {
    if (err) {
      console.log(err)
    }
    console.log('\n')
    console.table(result)
    console.log('\n\n\n\n\n\n\n')
  })  
};
function viewAllRoles() {
  db.query('SELECT * FROM role', (err, result)=> {
    if (err) {
      console.log(err)
    }
    console.log(result)
  })
};
function viewAllDepartments() {
  db.query('SELECT * FROM department', (err, result)=> {
    if (err) {
      console.log(err)
    }
    console.log(result)
  })
}




app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = {viewAllEmployees, viewAllRoles, viewAllDepartments}
