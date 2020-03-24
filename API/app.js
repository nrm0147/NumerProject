const express = require('express');
const mongoose = require('mongoose');
const app = express();  
const bodyparser = require('body-parser')
app.use(bodyparser.json())
const cors = require("cors")
app.use(cors());

//routes
app.get('/',(req, res) => {

});

//Import Route
const bisecapi = require('./routes/bisecapi') //ตัวหน้าถูกเรียก
const falseapi = require('./routes/falseapi');
const oneapi = require('./routes/oneapi');
const postse = require('./routes/seapi');
const newapi = require('./routes/newapi');
const fwohapi = require('./routes/fwohapi');
const bwohapi = require('./routes/bwohapi');
const cnoh2api = require('./routes/cnoh2api')
const cnoh4api = require('./routes/cnoh4api')

app.use('/bisecapi',bisecapi);
app.use('/falseapi',falseapi);
app.use('/oneapi',oneapi);
app.use('/secantapi',postse);
app.use('/newapi',newapi);
app.use('/fwohapi',fwohapi);
app.use('/bwohapi',bwohapi);
app.use('/cnoh2api',cnoh2api);
app.use('/cnoh4api',cnoh4api);




//ConnectDB
mongoose.connect('mongodb+srv://nrm0147:Non0615527989@cluster0-mw3hu.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,userMongoClient:true}) 
console.log('HI connected DB')

app.listen(8000);

