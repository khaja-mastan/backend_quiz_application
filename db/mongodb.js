const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1/taglet')
// .then(()=>{
//     console.log("Mongodb is connected");
// })
// .catch(()=>{
//     console.log("Mongodb connection is failed");
// })

const loginModel = new mongoose.Schema({
    userId :{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});
 module.exports = mongoose.model('login',loginModel );

