const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    switch(url) {
    
        case '/':
            //Setting header and response.
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>User Page</title></head>');
            res.write('<body><h1>Hello User, Time to Practice 1</h1></body>');
            res.write('<br><hr><br>');
            res.write('<form action="/create-user" method="POST">' +
                        '<input type="text" name="username">' +
                            '<button type="submit">Send Username</button>' +
                        '</input>'+
                      '</form>');
            res.write('</html>');
            return res.end();
    
        case '/users':
            //Setting header and response.
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Userlist Page</title></head>');
            res.write('<ul><li>Udemy</li><li>Maximilian</li><li>Caio</li><li>Vitor</li></ul>');
            res.write('</html>');
            return res.end();

        case '/create-user':
            const body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            });
            return req.on('end', () => {
                const parseBody = Buffer.concat(body).toString();   
                const username = parseBody.split('=')[1];        
                console.log('Username -> ', username);
                return res.end();
            });
    }
};

//First way to export a module.
//module.exports = requestHandler;

//Second way to export a module.
module.exports = {
    requestHandler
}

//Third way to export a module.
//module.exports.requestHandler = requestHandler;