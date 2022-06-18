const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongo_uri,{ useNewUrlParser: true }).then(()=>console.log("connected"))
.catch(err=>console.log("error"));
