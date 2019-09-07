const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

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

    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log('Buffer Chunk -> ', chunk, '\n');            
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log('Parsed Chunk -> ', parseBody, '\n');    
            const message = parseBody.split('=')[1];        
            fs.writeFileSync('message.txt', message);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
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