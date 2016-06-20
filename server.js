
/**
 * Module deps
 */

const fallback = require('express-history-api-fallback')
const compression = require('compression')
const express = require('express')
const { join } = require('path')

const build = join(__dirname, 'build')
const port = process.env.PORT || '8080'
const env = process.env.NODE_ENV
const app = express()

app.get('/robots.txt', (_, r) => r.type('text/plain').send('Disallow: /'))
app.use(compression({ threshold: 512 }))
app.use(express.static('build'))
app.use(fallback('index.html', { root: build }))

app.listen(port)
console.log(`ReBoil ${env} started on port ${port}`)
