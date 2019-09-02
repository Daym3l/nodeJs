const HTTP = require('http');

const ROUTES = require('./routes');


const SERVER = HTTP.createServer(ROUTES);

SERVER.listen(3001);
