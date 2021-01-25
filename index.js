const http = require('http');

const server = http.createServer((req,res) => {
    console.log(req.url)
    res.end("Xin chao nodejs")
})

server.listen(3000)

