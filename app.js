const express = require('express')

const app = express()
const cors = require('cors');
app.use(express.static("public"))

app.use(cors());

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/student', function (req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb+srv://zakaria:zakour72710@cluster0.khg9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var mydb = db.db('login')
        mydb.collection("datarequired").find().toArray().then(result=>{
            res.json(result)
        })

    })
})

app.post('/deletedata', function (req, res) {
    var eamilTodelete=req.body.email
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb+srv://zakaria:zakour72710@cluster0.khg9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var mydb = db.db('login')
        mydb.collection("datarequired").deleteOne({email:eamilTodelete}).then(()=>{
            res.json("done")
        })
    })
})

app.post('/dataset', function (req, res) {
    var arrive=req.body
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb+srv://zakaria:zakour72710@cluster0.khg9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var mydb = db.db('login')
        mydb.collection("datarequired").insertOne(arrive).then(()=>{
            res.json("done")
        })
    })
})

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
