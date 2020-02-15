const express = require('express');
const path = require('path')
var cors = require('cors');

//const bodyparser = require('body-parser')
require('./config/db')
const app =express()
app.use(express.json({extended:false}))
app.use(cors());

app.use('/', express.static(path.join(__dirname, 'public')))
  
app.use('/',require('./routes/index'));
app.use('/api/url',require('./routes/url'));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log("Server is started on"+PORT));