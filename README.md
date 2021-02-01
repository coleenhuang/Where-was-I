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

/users/:id  
returns the user with that id

/books  
returns a list of all the books

/books/:name  
return the book of that name


