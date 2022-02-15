const res = require("express/lib/response");
const db = require("./server");

class Queries {
  constructor(db) {
    this.db = db;
  }

  // View All Queries
  viewAllEmployees() {
    return this.db.promise().query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title as title, department.name as department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) as manager
   FROM employee
   
   JOIN role ON employee.role_id = role.id
   JOIN department ON role.department_id = department.id
   LEFT Join employee manager ON employee.manager_id = manager.id
   ORDER BY employee.id ASC;`
    );
  }
  viewAllRoles() {
    return this.db.promise().query(
      `SELECT role.id, role.title, department.name as department, role.salary
   FROM role
   
   JOIN department on role.department_id = department.id
   ORDER by role.id ASC;`
    );
  }
  viewAllDepartments() {
    return this.db.promise().query(`SELECT * FROM department
    ORDER by id ASC;`);
  }

  // Add Queries
  addEmployee(response) {
    return this.db.promise().query(
      `INSERT INTO employee set ?`, response)
  }
  addRole(response) {
    return this.db.promise().query(`INSERT INTO role SET ?`, response)
  };
  addDepartment(response){
    return this.db.promise().query(`INSERT INTO department SET ?`, response)
  }

  // Update Queries
  updateRole(response){
    console.log(response)
    return this.db.promise().query(
      `UPDATE employee SET role_id = ? WHERE id = ?`, [response.role_id, response.id]
    )
  }
  }
    
  

module.exports = new Queries(db);
