// import { Router } from 'express';
const express = require("express");
const controller = require("../controllers/controller.js");
const multer = require("multer");
const uploadMiddleware = require("../middleware/multermiddleware.js");
const uploadModel = require("../models/resumeSchema.js");
const router = express.Router();
const fs = require("fs");
const path = require("path");

//----Questions Routes----
router
  .route("/questions")
  .get(controller.getQuestions)
  .post(controller.insertQuestions)
  .delete(controller.dropQuestions);

//------Results Routes----
router
  .route("/result")
  .get(controller.getResult)
  .post(controller.postResult)
  .delete(controller.dropResult);

//-------Resume Routes------
router
  .route("/resume")
  .get(async (req, res) => {
    try {
      const resumes = await uploadModel.find();
      res.json(resumes);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while getting resumes", error: error.message });
    }
  })
  .post(uploadMiddleware.single("file"), async (req, res) => {
    const file = req.file.filename;
    console.log(file);
    await uploadModel
      .create({ file })
      .then((data) => {
        // console.log(data);
        console.log("Resume posted successfully...!");
        res.send(data);
      })
      .catch((error) => console.log(error));
  })
  .delete(async (req, res) => {
    const { resumeFile } = req.body;
    console.log("file ... :", resumeFile);
    if (!resumeFile) {
      res.status(400).json({ message: "Resume Id is not provided...!" });
    }

    try {
      if (resumeFile) {
        const filePath = path.join(__dirname, "../public/upload", resumeFile);
        await uploadModel.findOneAndDelete({ file: resumeFile });

        console.log("file path:", filePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("Deleted resume file successfully....!");
        } else {
          console.log("Resume file not found.");
        }

        console.log("Deleted resume document from database successfully....!");
        return res.json({ message: "Resume deleted successfully" });
      } else {
        return res.status(404).json({ message: "Resume not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
