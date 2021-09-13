const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    const string = `Server running at https://{0}:{1}/`;
    const newString = stringInject(string, [hostname, port]);
    console.log(newString);
})

function stringInject(str, arr) {
    if (typeof str !== 'string' || !(arr instanceof Array)) {
        return false;
    }

    return str.replace(/({\d})/g, function(i) {
        return arr[i.replace(/{/, '').replace(/}/, '')];
    });
}