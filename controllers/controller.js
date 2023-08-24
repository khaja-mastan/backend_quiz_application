
const Questions = require('../models/questionSchema.js');
const Results = require('../models/resultSchema.js');
const Resume = require('../models/resumeSchema.js');
const uploadMiddleware = require('../middleware/multermiddleware.js');
const { questions, answers } = require('../db/data.js');



//------get all questions----
 async function getQuestions(req, res) {
    try {
        const q = await Questions.find();
        res.json(q);        
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching questions', error: error.message });
    }
}

//------insert all questions----
  async function insertQuestions(req, res) {
    try {
        await Questions.insertMany({questions:questions , answers:answers});
            res.json({ message: 'Question inserted successfully...!!!' })
    } catch (error) {
        res.status(500).json({ message: 'Error while inserting question', error: error.message });
    }
}

//----delete question----
 async function dropQuestions(req ,res){
    try{
        await Questions.deleteMany(); 
        res.json({message:'Question deleted Successfully....!'});
    }catch(error){
        res.status(500).json({message:'error while deleting question',error:error.message})
    }
}

//-----result api s----
 async function getResult(req ,res){
    try{
        const r = await Results.find();
        res.json(r);
    }catch(error){
        res.status(500).json({message:'error while getting Result',error:error.message})
    }
}
 async function postResult(req ,res){
    try{
        const {username , result , attempts , points ,achived } = req.body;
        if(!username && !result) throw new Error('Data Not Provided....!')
        Results.create({username , result , attempts , points ,achived})
            res.json({message:'Result Saved Successfully....!'});
        
    }catch(error){
        res.status(500).json({message:'error while posting  Result',error:error.message})
    }
}
 async function dropResult(req ,res){
    try{
        await Results.deleteMany();
        res.json({message:'Result deleted Successfully...!'});
    }catch(error){
        res.status(500).json({message:'error while deleting Result',error:error.message})
    }
}
async function getResume(req ,res){
    try {
        let resume = await Resume.find()
        res.json(resume);
    } catch (error) {
        res.status(500).json({message:'error while getting Resume',error:error.message})
    }
}

async function postResume(req, res) {
    const file = req.file.filename; // Access the uploaded file using req.file
    try {
        if (!file) {
            throw new Error(' File not provided ...!');
        }
        await Resume.create({ file }); // Store the file in the MongoDB schema
        res.json({ message: 'Resume inserted successfully...!!!' });
    } catch (error) {
        res.status(500).json({ message: 'Error while posting Resume', error: error.message });
    }
}


module.exports = {
    getQuestions , insertQuestions, dropQuestions ,
    getResult , postResult , dropResult,postResume,getResume
}