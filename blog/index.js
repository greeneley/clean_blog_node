const express = require('express')
const app = new express()
const path  = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', (request, response) => {
    // response.sendFile(path.resolve(__dirname, 'pages/index.html'))
    response.render('index')
})
// app.get('/', (request, response) => {
// })

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post', (req, res) => {
    res.render('post')
})
