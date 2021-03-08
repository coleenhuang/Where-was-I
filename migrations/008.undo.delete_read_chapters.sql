CREATE TABLE read_chapters(
    id SERIAL PRIMARY KEY,
    chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
    users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    in_progress BOOLEAN
);