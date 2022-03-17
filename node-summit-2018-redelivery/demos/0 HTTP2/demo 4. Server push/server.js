const http2 = require('http2')
var fs = require('fs');

console.log("starting server");
const server = http2.createServer();
server.on('stream', (stream) => {
    stream.respond({ ':status': 200 });
    stream.pushStream({ ':path': '/' }, (err, pushStream, headers) => {
      if (err) throw err;
      pushStream.respond({ ':status': 200 });
      var i = 0; 
      var interval = setInterval(() => {
        pushStream.write("data")
        i++;
        if (i > 10) { 
            clearInterval(interval);
            pushStream.end('some pushed data');
            stream.end('some data');
        }
      }, 1000); 
    });
});
server.listen(8888);