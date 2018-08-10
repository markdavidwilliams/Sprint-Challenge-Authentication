<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT. <br>
    Middlware is used to alter a request in some usefule way on its way to the endpoint. Such as grabbing a password and hashing it before it gets inserted into the database by the endpoint. <br>
    Sessions sends a cookie to the client with a sessions ID in order to persist the login. <br>
    Bcrypt is an npm module that hashes and unhashes passwords. <br>
    JWT is a secure web token that carries a payload and a secret, when interpretted by the server decides if the client should have access to certain routes. <br> <br>

2.  What does bcrypt do in order to prevent attacks? <br>
    Bcrypt protects from attacks by adding salts - additional random data that makes each password hash unique. <br> <br>
3.  What are the three parts of the JSON Web Token? <br>
    `Header`, `Payload`, `Signature`
