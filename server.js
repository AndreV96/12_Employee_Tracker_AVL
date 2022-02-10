const express = require('express');
const mysql = require('mysql2');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: '',
    database: 'employees'
  },
  console.log(`Connected to the employees database.`)
)

//The View All queries

function viewAllEmployees() {
  db.query('SELECT * FROM employee', (err, result)=> {
    if (err) {
      console.log(err)
    }
    console.log(result)
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