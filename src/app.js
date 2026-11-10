const http = require('http');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.url === '/health') {
      res.end(JSON.stringify({ status: 'ok' }));
    } else if (req.url === '/') {
      res.end(JSON.stringify({
        message: 'Hello from my branch!',
        version: process.env.APP_VERSION || 'dev',
        host: require('os').hostname(),
      }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'not found' }));
    }
  });
}

module.exports = { createServer };
