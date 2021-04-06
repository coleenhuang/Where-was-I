CREATE TABLE reading_progress(
    id SERIAL PRIMARY KEY,
    chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
    users_id INTEGER REFERENCES users(userid) ON DELETE CASCADE,
    end_verse INTEGER
);