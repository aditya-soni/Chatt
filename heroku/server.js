const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

var apiRoutes = require('./server/routes/api');

var app = express();
var port = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,DELETE,OPTIONS,PATCH,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next()
});
app.use(express.static(path.join(__dirname,'dist')));

app.use('/api',apiRoutes);
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'))
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});