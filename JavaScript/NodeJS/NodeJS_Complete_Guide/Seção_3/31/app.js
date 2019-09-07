const http = require('http');

const server = http.createServer((req, res) => {

    const url = req.url;

    if(url === '/') {
        //Setting header and response.
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My Second Page</title></head>');
        res.write('<body>' +
                        '<form action="/message" method="POST">' +
                            '<input type="text" name="message">' +
                                '<button type="submit">Send</button>' +
                            '</input>'+
                        '</form>' +
                    '</body>');
        res.write('</html>');
        return res.end();
    }

    //Setting header and response.
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body>' +
                    '<h1>Hello from a NodeJS Server!</h1>' +
                '</body>');
    res.write('</html>');
    return res.end();
});

server.listen(3000);