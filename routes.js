const FILE_SYTEM = require('fs');

const requestHandler = (req, res) => {
    const _URL = req.url;
    const _METHOD = req.method;

    if (_URL === '/') {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (_URL === '/message' && _METHOD === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            FILE_SYTEM.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter message</title></head>');
    res.write('<body><h1>Hello Node JS</h1></body>');
    res.write('</html>');
    return res.end();
}

module.exports = requestHandler;