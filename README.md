# Where was I?

This is a bible reading tracker that helps keep track of what you've read in the Bible and bring you closer to completing your bible reading goals.

## Backend

### DB Schema
Users table
id
username
password

Books table
id
book_name


Chapters table
id
chapter_name
book_id(fk)

Read_Chapters table
id
chapter_id(fk)
user_id(fk)
in_progress(bool)

### Endpoints
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