const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', (request, response) => {
    BlogPost.find({}, function (error, posts) {
        console.log(posts);
        response.render('index', {
            blogposts: posts
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/post/:id', (req, res) => {
    BlogPost.findById(req.params.id, function (error, detailPost) {
        res.render('post', {
            detailPost
        })
    })
})

app.post('/posts/store', (req,res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/upload', image.name), function(err){
        BlogPost.create(req.body, (error, blogpost) =>{
            BlogPost.create({
                ...req.body,
                image: '/upload/' + image.name
            }, function(err){
                res.redirect('/')
            })
        })
    })
})
app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req, res) => {
    console.log(req.body)
    // res.redirect('/')
    BlogPost.create(req.body, (error, blogpost) => {
        res.redirect('/')
    })
})