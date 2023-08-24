const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // Correct destructuring
const path =require('path');


const storage = multer.diskStorage({
    destination:function(req , file , cd){
        cd(null , 'public/upload')
    },
    filename: function(req , file , cd){
      cd(null , `${uuidv4()}_${path.extname(file.originalname)}`)
    },    
});

const fileFilter = (req, file, cd) => {
  const allowedFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cd(null, true);
  } else {
    cd(null, false);
  }
};


const uploadMiddleware = multer({storage , fileFilter});

module.exports = uploadMiddleware;