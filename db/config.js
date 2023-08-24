const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/taglet')
.then(()=>{
    console.log("Mongodb is connected");
})
.catch(()=>{
    console.log("Mongodb connection is failed");
})