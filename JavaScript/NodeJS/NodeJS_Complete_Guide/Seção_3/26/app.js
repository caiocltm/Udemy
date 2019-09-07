const http = require('http');


/*const reqListener = (req, res) => {};
http.createServer(reqListener);*/

const server = http.createServer((req, res) => {
    console.log(req);
    process.exit();
});

server.listen(3000);