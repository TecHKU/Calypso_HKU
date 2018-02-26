var express = require('express');
var router = express.Router();
var multer = require('multer');
var project= require('../models/project');

// get function to add a new image
router.get('/', function(req, res, next) {
 res.render('addproject');
});

// storing the project image in uploads folder and setting the path
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' +Date.now()+".jpg")   // name of the image file in jpg
  }
})
var upload = multer({ storage: storage });

router.post('/', upload.any(), function(req, res, next) {
 //res.send(req.files);
 // path of the project images
 var path = req.files[0].path;

/*
var imageName = req.files[0].originalname;
 var imagepath = {};
 imagepath['path'] = path;
 imagepath['originalname'] = imageName;
*/
// Adding the new image in the database
 project.create({
   title: req.body.title,
   description: req.body.description,
   imagePath: path
   },function(error,post){
     if(error) return console.log("Error in project to database");
     console.log("Project created");
     res.send(post);
   }
 );

});

module.exports = router;
