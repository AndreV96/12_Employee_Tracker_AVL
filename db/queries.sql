SELECT employee.id, employee.first_name, employee.last_name, role.title as title, department.name as department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) as manager
FROM employee

JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT Join employee manager ON employee.manager_id = manager.id;

-- employee.first_name as manager

SELECT role.id, role.title, department.name as department, role.salary
FROM role

JOIN department on role.department_id = department.id;