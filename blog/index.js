const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validateMiddleware = require("./middleware/validationMiddleware");

app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', homeController)

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/post/:id', getPostController)

app.post('/posts/store', storePostController)

app.get('/posts/new',newPostController)

app.use('/posts/new', validateMiddleware);

app.post('/posts/store', (req, res) => {
    BlogPost.create(req.body, (error, blogpost) => {
        res.redirect('/')
    })
})