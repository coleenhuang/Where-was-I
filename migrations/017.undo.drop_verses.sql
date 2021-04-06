CREATE TABLE verses (
    id SERIAL PRIMARY KEY,
    verse_name INTEGER NOT NULL,
    chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE
);

CREATE TABLE read_verses (
    id SERIAL PRIMARY KEY,
    verse_id INTEGER REFERENCES verses(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);