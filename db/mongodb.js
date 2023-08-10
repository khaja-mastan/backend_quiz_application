const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/taglet')
.then(()=>{
    console.log("Mongodb is connected");
})
.catch(()=>{
    console.log("Mongodb connection is failed");
})

const loginSchema = new mongoose.Schema({
    useRId :{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});
const loginModel = mongoose.model('loginModel',loginSchema);
module.exports = loginModel;
