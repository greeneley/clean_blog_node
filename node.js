const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.end("HELLO NODE JS")
    res.writeHead(404)
})

server.listen(3000)

// const express = require('express')
// const app = express()
// app.listen(3000, () =>{
// console.log("App listening on port 3000")
// })