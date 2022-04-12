// Run below steps for setup project

1.npm install --save

2.npm run nodemondev

3.import post man collection (aexonic.postman_collection.json)

4.view document for better understanding ( https://documenter.getpostman.com/view/8365991/UVz1MBjB#eeaa64e4-ca6e-4ef3-b2fa-7c612aa9a273 )  

// 1.Create a login api with auth. 

url - http://localhost:2000/user/login

method - POST

body - 
{
    "email": "goabala1@gmail.com",
    "password": "123"
}

// 2. Create a registration api (first name, last name, email, password, mobile no); 

url - http://localhost:2000/user

method - POST

body - 
{
    "firstName": "Govardhan",
    "lastName": "AB",
    "email": "goabala1@gmail.com",
    "password": "123",
    "mobile": "6382276063"
}

// 3.Update user details api with token  

url - http://localhost:2000/user/6255491570609e2954db9ef6

method - PUT

AUTHORIZATION - Bearer Token {add token in headers}
body - 
{
    "firstName": "Govardhan",
    "lastName": "AB",
    "email": "goabala1@gmail.com",
    "mobile": "6382276063"
}

//4. List api for all users with token and pagination 

url - http://localhost:2000/user

method - GET

//5.Search api on (first name, last name, email, mobile no) single key with token and pagination  

url - http://localhost:2000/user/search?firstName=Govardhan&lastName=AB&email=goabala@gmail.com&mobile=6382276063

method - GET

PARAMS (optinal)

firstName -Govardhan
lastName - AB
email - goabala@gmail.com
mobile - 6382276063