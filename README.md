# Where was I?

This is a bible reading tracker that helps keep track of what you've read in the Bible and bring you closer to completing your bible reading goals.

## Technologies
The front end of this app is built using React, and the backend is built using node, express and postgreSQL. Testing is performed with mocha, chai and supertest.

## Backend

### DB Schema
Users table
id
username
password

Books table
id
book_name
num_of_chapts


Chapters table
id
chapter_name
book_id(fk)

Read_Chapters table
id
chapter_id(fk)
user_id(fk)
in_progress(bool)

### GET Endpoints
/users  
return the whole list of users

/users/:user_id  
returns the user with that id

/books  
returns a list of all the books

/books/:book_name  
returns the book of that name

/chapters 
returns a list of all the chapters

/chapters/:chapter_id  
return the chapter with that id

/read/:user_id  
returns the chapters that the user has read or is in the middle of reading

/read/:user_id/in_progress  
returns the chapters the user is in progress of reading

/read/:user_id/finished  
returns the chapters the user has finished