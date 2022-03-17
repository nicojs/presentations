// var http = require('http2');
// const server = http.createServer(); 
// server.on('stream', (stream, headers) => {
//     stream.respond({':status':200});
//     stream.end(); 
// });
// server.listen(8000);

var fs   = require('fs');
var http = require('http2');

const server = http.createSecureServer({
    key:fs.readFileSync('./server.key'),
    cert:fs.readFileSync('./server.cert')
});

server.on('stream', (stream, headers) => {
    // stream is a Duplex
    // headers is an object containing the request headers
    // respond will send the headers to the client
    // meta headers starts with a colon (:)
    stream.respond({ ':status': 200 });

    // there is also stream.respondWithFile()
    // and stream.pushStream()
    stream.end('Hello World!');
});

server.listen(8876);


// NODE_DEBUG=http2