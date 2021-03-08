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

/books/:book_id/verses  
returns all the verses for that book


/chapters 
returns a list of all the chapters

/chapters/:chapter_id  
return the chapter with that id

/chapters/:chapter_id/verses  
returns all the verses for that chapter


/read/:user_id  
returns all the verses the user has read

/read/:user_id/:book_id  
returns all the read verses for that user within that book

/read/:user_id/:chapter_id  
returns all the read verses for that user within that chapter


/plan/:user_id  
returns all the books in the reading goals

### POST Endpoints
needs to be able to create users, add read verses and create reading plans

### PATCH or PUT Endpoints
only thing that needs to be modified is the reading plan

### DELETE Endpoints
/read/:user_id  
resets the reading progress. removes all read verses for that user

/read/:user_id/:book_id  
removes all read verses of that user for that book

/read/:user_id/:chapter_id  
removes all read verses of that user for that chapter

/read/:user_id/:verse_id  
removes the verse from the reader's read verses


