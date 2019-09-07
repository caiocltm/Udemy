const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`URL -> ${req.url}`);
    console.log(`Method -> ${req.method}`);
    console.log('Headers ->', req.headers);

    //Setting header and response.
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello NodeJS Client!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);