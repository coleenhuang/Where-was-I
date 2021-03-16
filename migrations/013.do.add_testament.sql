CREATE TYPE covenant AS ENUM ('Old', 'New');

ALTER TABLE books ADD COLUMN testament covenant;