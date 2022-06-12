const inquirer = require('inquirer')
const mysql = require('mysql2')

 let db = mysql.createConnection({
     host: 'localhost',
     username: 'root',
     password: 'Hannah@5',
    // port: '3306',
     database: 'employee_db',
 })

 db.connect(function(err){
    if(err) throw err
 });

const introQuestions = [
    {
        type: 'list',
        name: 'toDo',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            "Nothing, I'm all done",
        ]
    },
]

inquirer.prompt(introQuestions)
.then(answers =>{
    console.log(answers.toDo);
    if(answers.toDo === 'View all departments'){
        db.connect(function(err){
            if(err) throw err
        },db.query(`GET * FROM department`).then(result => {
            console.table(result)
        }))
        inquirer.prompt(introQuestions)
    }
})
// const addDepartmentQuestions = [
// {
//     type: 'input',
//     name: 'departmentName',
//     message: 'What is the name of the department you would like to add?',
// },
// ]

// const viewDepartments = db.query(`GET * FROM department`).then(result => {
    //     console.table(result)
    // })
    // const viewRoles = db.query(`GET * FROM role`).then(result => {
        //     console.table(result)
        // })
        // const viewEmployees = db.query(`GET * FROM employee`).then(result => {
            //     console.table(result)
            // })
            // 
            // 