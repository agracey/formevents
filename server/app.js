// For the time being, I'll use the non-ES6 style of modules instead of dealing with webpack for both sides

const express = require('express')
const app = express()
const routes = require('./routes/index.js')
const winston = require('winston')

// set up default logging https://github.com/winstonjs/winston#using-the-default-logger
winston.add(winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()]
}))


// For use outside of GAE while developing
if (process.env.HOST_STATIC === 'true') {
  winston.warn('Setting up static hosting ')
  var path = require('path')

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/static/index.html'))
  })

  app.use('/static', express.static(path.join(__dirname, '../client/static')))
}

app.use('/api', routes)

app.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    winston.error(err)
    return
  }

  winston.warn('Listening on port %s', process.env.PORT || 8080)
})
