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
  addEmployee(response, employeeData, roleData) {
    const managerNames = response.employeeManager.split(" ")
    let role_id
    let manager_id
    for (const role of roleData[0]) {
      if (response.employeeRole === role.title) role_id = role.id
    }
    for (const manager of employeeData[0]) {
      if (managerNames[0] === manager.first_name && managerNames[1] === manager.last_name) manager_id = manager.id
    }
    return this.db.promise().query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES
        ("${response.employeeFirstName}", "${response.employeeLastName}", ${role_id}, ${manager_id})`
    );
  }
  addRole() {

  }
  addDepartment(){
    
  }
}

module.exports = new Queries(db);
