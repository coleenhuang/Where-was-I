const app = require('./app');
const knex = require('knex');
const { PORT, DB_URL } = require('./config')
require('dotenv').config()

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)

app.listen(PORT || 8080, 
    () => console.log(`Listening on port ${PORT || 8080}!`));