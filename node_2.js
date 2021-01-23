const express = require('express')
const { response } = require('express')
const { request } = require('http')
const app = express()
const path = require('path')
app.use(express.static('public'))

app.listen(3001, () => {
    console.log("App listening on port 3001")
})

app.get("/", (request, response) => {
    response.json({
        name: "Dinh Thanh Hai",
        website: "vntalking.com"
    })
})

app.get("/about", (request, response) => {
    // response.json({
    //     info: "about Dinh Thanh Hai"
    // })
    response.sendFile(path.resolve(__dirname, 'about.html'))
})

app.get("/contact", (request, response) => {
    // response.send("contact me")
    res.sendFile(path.resolve(__dirname, 'contact.html'))
})

app.get("*", function(req, res){
    res.header(404)
    res.send("page not found")
})

