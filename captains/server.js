const http = require('http');
const app = require('./app.js');

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log('captain services is running port', process.env.PORT);
});
