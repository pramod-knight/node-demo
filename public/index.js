const express = require('express')
var path = require('path');
const ejs= require('ejs');
const app = express();
const mongoose = require('mongoose')
const User = require('../models/users');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var crypto = require('crypto');
const { O_APPEND } = require('constants');
var key = "password";
var algo = 'aes256';
var bcrypt = require('bcryptjs');



const port = 3000;
//create database connection
mongoose.connect('mongodb+srv://shifakhan:shifakhan@cluster0.sjew5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}); 

    var db=mongoose.connection;
    db.on('error', console.log.bind(console, "connection error"));
    db.once('open', function(callback){
        console.log("connection succeeded");
    })

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

//setup public folder

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.get('/', function (req, res) {
    res.render('home')
});


app.post('/register', function(req,res){
console.log("register");
    var f_name = req.body.f_name;
    var l_name =req.body.l_name;
    var u_name = req.body.u_name;
    var email =req.body.email;
    var password=req.body.password;
    var r_password =req.body.r_password;
  
    var data = {
        "f_name":f_name,
        "l_name":l_name,
        "u_name":u_name,
        "email":email,
        "password":password,
        "r_password":r_password
    
    }
   
        bcrypt.hash(password, 10, function(err, hash) {
            data.password=hash
            User.insertMany(data,function(err, collection){
                if (err) throw err;
                console.log("Record inserted Successfully");
                return res.redirect('/login');
                      
            });
        });
    
    })

app.post('/login', function(req,res){
    var email =req.body.email;
    var password=req.body.password;



    User.findOne({email})
    .then((data)=>{
        if(!data) 
          return res.status(400).json({status: false, message: "user not found"});
bcrypt.compare(password,data.password,function(err,result){
    if(result==false) 
    return res.status(400).json({status: false, message: "wrong password"});

  res.render('home')

})

        
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({status: false, message: 'Something is wrong'});
    })
})

app.get('/register', function (req, res) {
    res.render('register')


});


app.get('/login', function (req, res) {
    res.render('login')
});


app.listen(port, () => console.log(`MasterEJS app Started on port ${port}!`));