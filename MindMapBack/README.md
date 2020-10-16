The MindMapBack directory is a backend written in Java 14.
It is essential to the good behaviour of the web viewer from the 'Website' directory.

This backend exposes the following endpoints, with DOMAIN as the domain name :

-------------------------------------------------------------------------------

### USERS

###### Sign Up a new user :

POST http://DOMAIN:9999/users/signup

Body :
```
{
    email : "xxx@xxx.xxx",
    password : "xxx"
}
```
Response :
```
{
    token : "xxx",
    error : "xxx"
}
```
NB : If there was no error, the error field will be null. If there was one, the token field will be null.

###### Login

POST http://DOMAIN:9999/users/login

Body:
```
{
    email : "xxx@xxx.xxx",
    password : "xxx"
}
```
Response :
```
{
    token : "xxx",
    error : "xxx"
}
```
NB : same as signup

###### Logout

GET http://DOMAIN:9999/users/logout

Header :

`Authorization : Bearer xxxTOKENxxx`

Response :

```
{
    error : "xxx"
}
```
NB : error is null if logout succeeds.
