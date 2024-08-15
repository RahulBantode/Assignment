# Assignment

## Backend Application Development

## Prequesities 

1. setup mysql server / workbench on system. nodejs with latest version.
2. First clone the project / unzip the project file.
3. Then hit command as `npm install` / `npm i`
4. Create database schema with any name but for simplicity use the schema name same as used in application like `backend_db`
5. There is masterscript.sql file present in the application (src/storage/masterScript.sql). Just export it into the mysql workbench
6. The admin credentials are 
    email :- `rahul@xyz.com`  password :- `rahul@123`
7. Make changes in .env file as per your db configurations.
8. The hit command as `npm start` to start the server, server will start on port `8090`.
9. For API's you can use any of the tool like postman / curl shell etc.
10. You can visit `output_screenshots` folder to see the output screen.


## Features

1. Implemented logger into the application using `winston` library tool which will log the application data and save into the file.
2. Using `sequelize orm` all the mysql DB related task are handled.
3. By using `express-validator` request data validation part also handled.
4. Created the `API DOCUMENTATTION` for more information about the API and signature please check this file `API_DOCS.md`

## Problem Statement & solution
Build the following system using Node.js or Nestjs framework and MongoDB or MySQL database:
Create APIs for following operations in NodeJS. You can use any framework in NodeJS, Nestjs, express, etc.

1. Create an Admin account, User account
--> * To handle this I have implement the route like /signup where user are going to register there respective data and if the user is 
    new user then the account is created for that respective user.
    * If the user is first user creating the a/c and if no user present in DB with role admin then the user who are creating account are
    assigned the role as 'admin' (As per the need that is only one admin), And rest of all the users will be (role:users)
    * If the user already registered or already have an account then system not allowed to add this user they can directly logged in with respective credentials.

2. There will be only one Admin.
--> There is only one admin in system who can handle users update/delete products update/delete and whether the products display
    on website or not.

3. The user can Sign up or Sign In.
--> There is two routes /signup and /signin -- For new users first they need to signup and then signin for authorization token.

4. The website will display products added by users.
--> Exposed the route as /product/add To add the the products into the system

5. Admin can do delete/update operations on Users.
--> Exposed route as /update/user & /delete/user where list of users ids come in req.body and update and delete operation will perform.
    And it only allowed to user who are admin.

6. Admin can decide whether products can be displayed on a web page or not and also can do delete/update operations on products.
--> * Exposed route as /product/control where the product id and its status (active-1/inactive-0) come in request body and accordingly
      update the value into the DB. This allowed to only admin user, to show the product on web or not.
    * Exposed route as /product/update & /product/delete where list of products ids come in req.body and update and delete operation will perform. And it only allowed to user who are admin.

7. There is one route as /products which fetch all the products having status active and respond back to UI client 


