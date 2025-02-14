// require your server and launch it here
require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`\n*** server listening on port ${port} ***\n`);
});