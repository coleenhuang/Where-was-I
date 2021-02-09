function makeChaptersArray() {
    return [
        {
          id: 1,
          chapter_name: 1,
          book_id: 1
        },
        {
            id: 2,
            chapter_name: 1,
            book_id: 2
        },
        {
          id: 3,
          chapter_name: 2,
          book_id: 1
        }
        
      ]
}

function makeChaptersArrayWithBookname() {
  return [
    {
      id: 1,
      chapter_name: 1,
      book_name: 'Genesis'
    },
    {
        id: 2,
        chapter_name: 1,
        book_name: 'Exodus'
    },
    {
      id: 3,
      chapter_name: 2,
      book_name: 'Genesis'
    }
    
  ]
}

module.exports = {
    makeChaptersArray,
    makeChaptersArrayWithBookname
}