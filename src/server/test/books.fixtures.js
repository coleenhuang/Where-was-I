function makeBooksArray() {
    return [
        {
          id: 1,
          book_name: 'Genesis',
          num_of_chapts: 50,
          testament: 'Old'
        },
        {
          id: 2,
          book_name: 'Exodus',
          num_of_chapts: 40,
          testament: 'Old'
        },
        { id: 3,
          book_name: 'Matthew',
          num_of_chapts: 28,
          testament:'New'
        },
        {
          id: 4,
          book_name: 'Mark',
          num_of_chapts: 16,
          testament:'New'
        }
      ]
}

module.exports = {
    makeBooksArray
}