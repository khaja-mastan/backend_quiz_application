const express = require('express');
require('../db/config')
const cors = require('cors');
const morgan = require('morgan')
const {config} = require('dotenv')
const multer = require('multer')
const router = require('../Router/routes.js');
const loginModel = require('./mongodb');
const { MongooseError } = require('mongoose');
const app = express();

// ----- Add middleware ---
app.use(express.json());
app.use(morgan('tiny'));
app.use(express())
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(cors())
config();

//-----application port ---
const port = process.env.PORT || 8001;

//---routes---
app.use('/api',router) // ----apis


app.get("/",cors(),(req,res)=>{
     try{
      res.json("Get Request")
     }
     catch(error){
      res.json(error)
     }
})

app.post('/login', async (req, res) => {
    const { userId, password } = req.body;
    try {    
      const user = await loginModel.findOne({
        userId,
        password
      });
      if (user) {
        res.json('exist'); // Login successful      
      } else {
        res.status(401).json('notexist'); // Invalid credentials
      }
    } catch (error) {
      console.error(error);
      res.status(500).json('error'); // Server error
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running onn port http://localhost:${port}`);
  });