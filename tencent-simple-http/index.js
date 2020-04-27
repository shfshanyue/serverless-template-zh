const http = require('http')

const app = (req, res) => {
  res.end('hello, shanyue')
}

http.createServer(app).listen(3000)

module.exports = app
