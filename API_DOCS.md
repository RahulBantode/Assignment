# API DOCUMENTATION

## /signup
To create new account user need to /signup first.
#### HTTP_METHOD
POST
#### URL
localhost:8090/api/auth/signup
#### REQUEST_BODY
```js
{
    "username": "Rahul Bantode",
    "email":"rahul@xyz.com",
    "role": "admin",
    "mobile_no": "8090897867",
    "password": "rahul@123"
}
```
#### RESPONSE
```js
{
    <Data> : "User account created successfully"
}
```
## /signin
To get authorization token and access the backend application functionality need to sign in first.
#### HTTP_METHOD
POST
#### URL
localhost:8090/api/auth/signin
#### REQUEST_BODY
```js
{
    "email":"rahul@xyz.com",
    "password": "rahul@123"
}
```
#### RESPONSE
```js
{
    <token> : 'Access token'
}
```

## /update/user
To update the user data (only admin can do this)
#### HTTP_METHOD
PUT
#### URL
localhost:8090/api/admin/update/user
#### REQUEST_HEADERS
authorization - Bearer <token>
#### REQUEST_BODY
```js
{
    "usersData": [
        {
            "id": 18,
            "username":"Nikhil chaudhary",
            "mobile_no":"9090909090"
        }
        {
            "id": 2,
            "username":"yogesh chaudhary",
            "mobile_no":"9090909090"
        },
        {
            "id": 3,
            "username":"parag chaudhary",
            "mobile_no":"9090909090"
        }
    ]    
}
```
#### RESPONSE
```js
{
    <Data> : 'userData updated successfully'
}
```

## /delete/user
To delete the user data (only admin can do this)
#### HTTP_METHOD
DELETE
#### URL
localhost:8090/api/admin/delete/user
#### REQUEST_HEADERS
authorization - Bearer <token>
#### REQUEST_BODY
```js
{
    "usersIdsToDelete": [9,12]    
}
```
#### RESPONSE
```js
{
    <Data> : 'userData deleted successfully'
}
```

## /product/update
To update the products into the system (Only admin has permission)
#### HTTP_METHOD
PUT
#### URL
localhost:8090/api/admin/product/update
#### REQUEST_HEADERS
authorization - Bearer <token>
#### REQUEST_BODY
```js
{
    "productsDetails": [
        {
            "id": 5,
            "product_name": "product_name",
            "price": "25",
            "description" : "Hardware",
            "status": 1
        },
        {
            "id": 6,
            "product_name": "hammer",
            "price": "99",
            "description" : "Hardware",
            "status": 1
        }
    ]
}
```
#### RESPONSE
```js
{
    <Data> : 'products updated successfully'
}
```

## /product/delete
To update the products into the system (Only admin has permission)
#### HTTP_METHOD
DELETE
#### URL
localhost:8090/api/admin/product/delete
#### REQUEST_HEADERS
authorization - Bearer <token>
#### REQUEST_BODY
```js
{
    "productsIdsToDelete": [7,50]
}
```
#### RESPONSE
```js
{
    <Data> : 'products deleted successfully'
}
```

## /products
To display the products on website 
#### HTTP_METHOD
GET
#### URL
localhost:8090/api/admin/products
#### REQUEST_HEADERS
authorization - Bearer <token>
#### RESPONSE
```js
{
    <Data> : Products
}
```

## /product/control
To update the status of product in DB (Here admin can control whether to show product on website or not) 
#### HTTP_METHOD
PUT
#### URL
localhost:8090/api/admin/product/control
#### REQUEST_BODY
```js
{
    "id": 3,
    "status":0
}
```
#### REQUEST_HEADERS
authorization - Bearer <token>
#### RESPONSE
```js
{
    <Data> : 'Products status updated successfully'
}
```
