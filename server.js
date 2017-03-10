
/**
 * Module deps
 */

const fallback = require('express-history-api-fallback')
const compression = require('compression')
const express = require('express')
const { join } = require('path')
const { MongoClient } = require('mongodb')

const build = join(__dirname, 'build')
const port = process.env.PORT || '8080'
const env = process.env.NODE_ENV
const app = express()
let db;

// app.get('/robots.txt', (_, r) => r.type('text/plain').send('Disallow: /'))
app.use(compression({ threshold: 512 }))
app.use(express.static('build'))
app.use(fallback('index.html', { root: build }))

app.post('/increment', function (req, res) {

})

app.post('/decrement', function (req, res) {

})

MongoClient.connect('mongodb://localhost:27017/test')
  .then(start)
  .catch(console.log)

function start (_db) {
  db = _db
  app.listen(port)
  console.log(`ReBoil ${env} started on port ${port}`)
}
