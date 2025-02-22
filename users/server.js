const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(3001, () => {
  console.log('user service is running 3001');
});
