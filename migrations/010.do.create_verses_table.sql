CREATE TABLE verses (
    id SERIAL PRIMARY KEY,
    verse_name INTEGER NOT NULL,
    chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE
)