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
    "email" : "xxx@xxx.xxx",
    "password" : "xxx"
}
```
Response :
```
{
    "token" : "xxx",
    "error" : "xxx"
}
```
NB : If there was no error, the error field will be null. If there was one, the token field will be null.

###### Login

POST http://DOMAIN:9999/users/login

Body:
```
{
    "email" : "xxx@xxx.xxx",
    "password" : "xxx"
}
```
Response :
```
{
    "token" : "xxx",
    "error" : "xxx"
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
    "error" : "xxx"
}
```
NB : error is null if logout succeeds.

### MINDMAPS

###### Upload a new mindmap

POST http://DOMAIN:9999/mindmaps/create

Header :

`Authorization : Bearer xxxTOKENxxx`

Body:
```
{
    "text" : "JSON_DOC",
    "name" : "example_mindmap"
    "isPublic" : true|false
}
```
Response :
```
{
    "id" : "xxx",
    "error" : "xxx"
}
```
NB : id can later be used to access the uploaded mindmap.

###### Get owned mindmaps

GET http://DOMAIN:9999/mindmaps/getowned

Header :

`Authorization : Bearer xxxTOKENxxx`

Response :
```
{
    "mindmapsList": [
        {
            "id": X,
            "name": "XXX",
            "isPublic": true/false
        },
        ...
    ],
    "error": null
}
```

###### Get mindmap from id or url

/!\ You cannot put id AND url, there is ALWAYS one of them with the null value

GET http://DOMAIN:9999/mindmaps/getMindmap

Header :

`Authorization : Bearer xxxTOKENxxx`

Body:
```
{
    "id" : Int du mindmap,
    "url": Url du mindmap
}
```

Response :
```
{
    "mindmap" : "Json du mindmap"
    "error"   : "null"
}
```

### LINKS

###### Add a mindmap link in public

*N.B. the owner id of a private mindmap is the id of the user that send the request*

POST http://DOMAIN:9999/links/addPublicLink

Header :

`Authorization : Bearer xxxTOKENxxx`

Body:
```
{
    "idMindmap" : Int du mindmap,
    "nodeid"    : Bigint Id du node,
    "isPublic"  : true/false,
    "emails"     : Array of Username -- should be emails
}
```

Response :
```
{
    "url": "UrlGenerated",
    "error": "null"
    "addedEmails": [
        "thomas.curti@epita.fr",
        "vincent1.masson@epita.fr"
    ]
}
```