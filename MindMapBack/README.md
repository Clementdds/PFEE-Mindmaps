The MindMapBack directory is a backend written in Java 14.
It is essential to the good behaviour of the web viewer from the 'Website' directory

This backend exposes the following endpoints, with DOMAIN as the domain name :

-------------------------------------------------------------------------------

### USERS

###### Sign Up a new user

POST http://DOMAIN:9999/users/signup
Body :
{
	email : "xxx@xxx.xxx",
	password : "xxx"
}
Return value :
{
	token : "xxx",
	error : "xxx"
}
Note : If there was no error, the error field will be null. If there was one, the token field will be null.
