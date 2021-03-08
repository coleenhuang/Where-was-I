# Where was I?

This is a bible reading tracker that helps keep track of what you've read in the Bible and bring you closer to completing your bible reading goals.

## Technologies
The front end of this app is built using React, and the backend is built using node, express and postgreSQL. Testing is performed with mocha, chai and supertest.

## Backend

### DB Schema
![Database schema](/dbschema.png?raw=true)

### GET Endpoints
/users  
return the whole list of users

/users/:user_id  
returns the user with that id

/books  
returns a list of all the books

/books/:book_id 
returns the book with that id

/books/:book_id/chapters
returns all the chapters for that book

/chapters 
returns a list of all the chapters

/chapters/:chapter_id  
return the chapter with that id

/chapters/:chapter_id/verses  
returns all the verses for that chapter




### POST Endpoints

### PATCH Endpoints

### DELETE Endpoints