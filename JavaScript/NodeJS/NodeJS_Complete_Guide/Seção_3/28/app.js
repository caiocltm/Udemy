const http = require('http');


/*const reqListener = (req, res) => {};
http.createServer(reqListener);*/

const server = http.createServer((req, res) => {
    console.log(`URL -> ${req.url}`);
    console.log(`Method -> ${req.method}`);
    console.log('Headers ->', req.headers);

    process.exit();
});

server.listen(3000);