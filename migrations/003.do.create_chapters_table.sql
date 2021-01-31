CREATE TABLE chapters(
    id SERIAL PRIMARY KEY,
    chapter_name INTEGER NOT NULL,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE
);