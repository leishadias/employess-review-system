# Performix
# Employee-Review-System

Name: Leisha Aloma Dias

Linkedin: www.linkedin.com/in/leisha-dias

Hosted Link: http://3.87.1.153/         [AWS]
             http://ERSystem.mooo.com   [freedns.afraid.org]

## Problem statement
Create an application that allows employees to submit feedback toward each other’s performance.

### Description

A full stack app, in which employees have to write reviews to the users assigned.
Every employee will be assigned with other employees to be reviewed.
The admin has the task to allot reviewers and reviwees. The admin can also add new employees, delete employees and assign another employee as admin.

## Features
- Admin view
  - Add/remove/update/view employees
  - Add/update/view performance reviews
  - Assign employees to participate in another employee's performance review
- Employee view
  - List of performance review requiring feedback
  - Submit feedback
* Make 1 login for admin and employee
* An employee can register, only admin can make an employee an admin


## Languages, Frameworks and Tech stack used
- This project was made using HTML, CSS and Javscript.
- Additional framework like bootstrap was used as well.
- Node , Express, Mongodb , EJS was used as well.

### How to setup the project on local system

  1. Clone this project
  2. Start by installing npm if you don't have it already.
  3. Navigate to Project Directory.
  4. Update environment variables as follows:
      - ERS_DB="ERsystem_prod"
      - ERS_ENVIRONMENT="production"
      - ERS_SESSION_COOKIE_KEY="somekey"

Run the following commands.
   ```` 
        npm install 
        npm start || npm run prod_start
   ````

#### An employee can also login as admin by using the password: admin123

### Features

  You can review the employees. The admin has the special power to assing, the task to employee, remove the employee, add new admin, and also employee;
  
  # Sign-Up
  

  # Sign-In
  

  # HomePage
  
  
  # Home menu - Admin View
  

  # Home menu - Employee view
  
  
  # Assign Task
  

  # Add employee
  

  # Appoint admin
  
  
  # Employee List
  
  
  # Admin Login
  

  # Assigned tasks
  

  # Reviews received
  

### Folder Structure

````
Employee Review System
    |----assets
    |      |----css
    |      |----images
    |             
    |----config
    |      |----environment.js
    |      |----middleware.js
    |      |----mongoose.js
    |      |----passport-local-strategy.js
    |
    |----controllers
    |      |----admin_controller.js
    |      |----home_controller.js
    |      |----review_controller.js
    |      |----user_controller.js
    |
    |----models
    |      |----review.js
    |      |----user.js
    |
    |----node_modules
    |
    |----production_logs
    |
    |----routes
    |      |----admin.js
    |      |----index.js
    |      |----reviews.js
    |      |----users.js
    |
    |----views
    |      |----_admin_login.ejs
    |      |----_assign_task.ejs
    |      |----_header.ejs
    |      |----_make_admin.ejs
    |      |---- addEmployee.ejs
    |      |---- employee.ejs
    |      |---- forgot_password.ejs
    |      |----home.ejs
    |      |----layout.ejs
    |      |----user_sign_in.ejs
    |      |----user_sign_up.ejs
    |
    |----.gitignore
    |
    |---- index.js
    |
    |---- package-lock.json
    |
    |----package.json
````
