ALTER TABLE reading_goal DROP COLUMN user_id;
ALTER TABLE read_verses DROP COLUMN user_id;

ALTER TABLE reading_goal 
ADD COLUMN user_id VARCHAR(299) REFERENCES users(userid) ON DELETE CASCADE;

ALTER TABLE read_verses
ADD COLUMN user_id VARCHAR(299) REFERENCES users(userid) ON DELETE CASCADE;