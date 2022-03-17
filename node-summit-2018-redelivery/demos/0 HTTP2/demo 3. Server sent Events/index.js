const { createSecureServer } = require('http2')
const pem = require('https-pem')
const { finished } = require('stream')

const server = createSecureServer(pem, (req, res) => {
    if (req.url === "/") {
        res.end(`
            <html><script>
            const ev = new EventSource('/time');
            ev.addEventListener('message', (result) => {
                document.querySelector('#time').innerHTML += ('<li>' + result.data + '</li>');
            });
            </script><body>Hello server sent events<ul id="time"></ul></body></html>
        `);
        return 
    } else if (req.url === '/time') {
        console.log('time event');
        res.setHeader('content-type', 'text/event-stream')
        const interval = setInterval(() => {
            console.log('time event');
            res.write(`event time\ndata:${new Date().toISOString()}\n\n`)
        }, 1000)
        finished(res, () => { clearInterval(interval)})
        return 
    }
    res.statusCode = 404;
    res.end('not found')
})

server.listen(8083);