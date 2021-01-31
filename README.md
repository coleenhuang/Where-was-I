# Where was I?

This is a bible reading tracker that helps keep track of what you've read in the Bible and bring you closer to completing your bible reading goals.


## DB Schema
Users table
id
username
password

Books table
id
book_name
chapters

Chapters table
id
chapter_name
book_id(fk)

Read_Chapters table
chapter_id(fk)
user_id(fk)
in_progress(bool)


