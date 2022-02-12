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
   LEFT Join employee manager ON employee.manager_id = manager.id;`
    );
  }
  viewAllRoles() {
    return this.db.promise().query(
      `SELECT role.id, role.title, department.name as department, role.salary
   FROM role
   
   JOIN department on role.department_id = department.id;`
    );
  }
  viewAllDepartments() {
    return this.db.promise().query("SELECT * FROM department");
  }

  //Add Queries
  addEmployee() {
    return this.db.promise().query("")
  }
}

module.exports = new Queries(db);
