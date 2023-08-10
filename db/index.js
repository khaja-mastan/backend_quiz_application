const express = require('express');
const loginModel = require('./mongodb');
const cors = require('cors');
const app = express();
const morgan = require('morgan')
const {config} = require('dotenv')

// ----- Add middleware ---
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgan('tiny'));
config();

//-----application port ---
const port = process.env.PORT || 8001;

//---routes---
app.get("/",cors(),(req,res)=>{
     try{
      res.json("Get Request")
     }
     catch(error){
      res.json(error)
     }
})

app.post('/login', async (req, res) => {
    const { useRId, password } = req.body;
  
    try {
      const user = await loginModel.findOne({
         useRId,
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
  
  app.listen(8001, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });