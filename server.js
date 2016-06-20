
/**
 * Module deps
 */

const express = require('express')
const compression = require('compression')

const port = process.env.PORT || '8080'
const env = process.env.NODE_ENV

const build = express.static('build')

const app = express()
app.get('/robots.txt', (_, r) => r.type('text/plain').send('Disallow: /'))
app.use(compression({ threshold: 512 }))
app.use('/', build)

app.listen(port)
console.log(`ReBoil ${env} started on port ${port}`)
