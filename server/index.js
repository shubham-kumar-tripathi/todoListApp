const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const Note = require('./models/Note')
const app = express()
app.use(express.json({extended: true}))
app.use(express.urlencoded())
const port = 3000


mongoose.connect("mongodb+srv://aalsiaadmi:pass123@mynoteapp-cluster.bexnah9.mongodb.net/?retryWrites=true&w=majority");
mongoose.connection.on('error', err => {
    if(!error){
        console.log("Successfully Connected")
    }
    
  });


// Endpoints to serve the HTML
app.get('/', (req, res) => {
  res.sendFile("index.html", {root: '../frontend'})
})

app.get('/login', (req, res) => {
    res.sendFile("login.html", {root: '../frontend'})
})

app.get('/signup', (req, res) => {
    res.sendFile("signup.html", {root: '../frontend'})
})

//Endpoints for APIs
app.post('/getnotes', async (req, res) => {
    let notes = await Note.find({email: req.body.email})
    
    res.status(200).json({success: true, notes})
})

app.post('/login', async (req, res) => {
    const {userToken } = req.body
    let user = await User.findOne(req.body)
    if(!user){
        res.status(200).json({success: false, message: "No user found!"})
    }
    else{
        res.status(200).json({success: true, user: {email: user.email}, message: "User Found"})
    }

})

app.post('/signup', async (req, res) => {
    const {userToken } = req.body
    console.log(req.body)
    let user = await User.create(req.body)
    res.status(200).json({success:true, user: user})
})

app.post('/addnote', async (req, res) => {
    const {userToken } = req.body
    let note = await Note.create(req.body)
    res.status(200).json({success:true, note})
})

app.post('/deletenote', (req, res) => {
    const {userToken } = req.body
    res.sendFile("signup.html", {root: __dirname})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})