# rest-server-passport
This is a server for conFusion Restaurant.

(1) npm i to install the nodes modules.
(2) Run mondodb by going to document/mongodb and run mongod --dbpath=data
(3) Start the server by using npm start.
(4) Go to https://localhost:3443/users/facebook/callback on the browser.
    OR by using POST https://localhost:3443/users/login in postman {"username": "admin", "password": "123"}
(5) To test in postman and get https://localhost:3443/dishes by using the token in the header with 'x-access-token' as key.
