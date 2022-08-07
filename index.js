const mysql = require('mysql2');
const inquirer = require("inquirer");
const prompt = inquirer.prompt

let db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Hannah@5',
    port: '3306',
    database: 'employee_db',
    dialect: 'mysql'
})

db.connect((err) => {
    if (err) throw err;
    else {
        start();
    };
});


 start = () => {
    prompt( {
        name: 'initialQuestions',
        type: 'list',
        message: 'Hello, what would you like to do today?',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Department', 'Add Role', 'Update Employee Role', 'Delete Employee', 'Exit']
    }).then ( (answers) => {
        if (answers.initialQuestions === "View All Employees") {
                viewEmployees();
        } else if (answers.initialQuestions === "View All Departments"){
                viewDepartments();
        } else if (answers.initialQuestions === "View All Roles"){
                viewRoles();
                } else if (answers.initialQuestions === "Add Employee"){
                addEmployee();
                } else if (answers.initialQuestions === "Add Department"){
                addDepartment();
                } else if (answers.initialQuestions === "Add Role"){
                addRole();
                } else if (answers.initialQuestions === "Update Employee Role"){
                updateRole();
                } else if (answers.initialQuestions === "Delete Employee"){
                deleteEmployee();
                } else{
                db.end();
        };
    });
};
 next = () => {
    inquirer.prompt( {
        name: 'more',
        type: `list`,
        message: `Continue???`,
        choices: [`Yes`, `No`]
    }).then ( (yourAnswer) => {
        if (yourAnswer.more === `Yes`) {
            return start();
        } else{
                db.end();
        }
    })
}

viewEmployees = () => {
    db.query(`SELECT * FROM employees`, (err, results) => {
        console.table(results);
        next();
    });
};

viewDepartments = () => {
    db.query(`SELECT * FROM department`, (err, results) => {
        console.table(results);
        next();
    })
}

viewRoles = () => {
    db.query(`SELECT * FROM roles`, (err, results) => {
        console.table(results);
        next();
    })
}
addEmployee = () => {
    db.query(`SELECT * FROM roles`, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'name1',
                type: 'input',
                message: 'What is the employees first name?'
            },
            {
                name: 'name2',
                type: 'input',
                message: 'What is the employees last name?'
            },
            {
                name: 'employeeRole',
                type: 'list',
                message: 'What is the employees role?',
                choices:  () => {
                    let possibleRoles = [];

                    for (var i = 0; i < results.length; i++) {
                        possibleRoles.push(results[i].title);
                    }
                    return possibleRoles;
                }
            }
        ]).then((answer) => {
            db.query(`SELECT * FROM roles WHERE title='${answer.employeeRole}';`, (err, results) => {
                if (err) throw err;
                db.query("INSERT INTO employees SET ?", {
                    first_name: answer.name1,
                    last_name: answer.name2,
                    role_id: results[0].id,
                    manager_id: results[0].id 
                });
            });
            next();
        });
    });
};

addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'newDepartment',
        message: 'What is the name of the department you would like to add?'
    }).then((answer) => {
        db.query(`INSERT INTO department (dept_name) VALUES ('${answer.newDepartment}');`, (err) => {
            if(err) throw err;
    }
        );
    next();
    });
};

addRole = () => {
    db.query(`SELECT * FROM department`, (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'newRole',
                type: 'input',
                message: 'What is the title of the new role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the new role?'
            },
            {
                name: 'department',
                type: 'list',
                message: 'What department does the new role belong to?',
                choices: () => {
                    let departmentsArr = [];
                    for (var i = 0; i < results.length; i++) {
                        departmentsArr.push(results[i].dept_name);
                    }
                    return departmentsArr;
                }
            }
        ]).then((answer) => {
            db.query(`SELECT * FROM department WHERE dept_name='${answer.department}';`, (err, results) => {
                if (err) throw err;
                db.query("INSERT INTO roles SET ?", {
                    title: answer.newRole,
                    salary: parseInt(answer.salary), 
                    department_id: results[0].id
                });
            });
            next();
        })
    });
};

deleteEmployee = () => {
    inquirer.prompt ([
        {
            name: 'name1',
            type: 'input',
            message: "What is the employe's first name?"
        },
        {
            name: 'name2',
            type: 'input',
            message: "What is the employee's last name?"
        }
    ]).then((ans) => {
        db.query(`DELETE FROM employees WHERE first_name='${ans.name1}' and last_name='${ans.name2}';`, (err) => {
            next();
        }
        );
    });
};
