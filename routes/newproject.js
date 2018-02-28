var express = require('express');
var router = express.Router();
var multer = require('multer');
var project= require('../models/project');
var Tags=require('../models/tag');

// get function to add a new image
router.get('/', function(req, res, next) {
 res.render('addproject');
});


var authenticate = function(req,res,next){
  if (req.session && req.session.user) return next();
  return res.redirect('/login');
}

// creating a list of tag id for the project. Adding new tags to the database if doesnot exist
var tagHandler =function(list){
  var listOfTagsId=[];
  for(var string of list){
    Tags.findOne({name: string},function(error,tag){
      if (error)
        return console.log("Error in accessing database");
      if (!tag)
      {
        Tags.create({
          name: string
        },function(error,addedTag){
          if(error) return console.log("Error in adding tags to database");
          console.log("Tags created");
          listOfTagsId.push(addedTag._id);}
        );
      }
      else {
        listOfTagsId.push(tag._id);
      }
    });
  }
  return listOfTagsId;

}




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

router.post('/',authenticate,upload.any(), function(req, res, next) {
 //res.send(req.files);
 // path of the project images
 var path = req.files[0].path;

/*
var imageName = req.files[0].originalname;
 var imagepath = {};
 imagepath['path'] = path;
 imagepath['originalname'] = imageName;
*/
listOfTagsId=tagHandler(listoftags send by frontend)
listOfRolesId=roleHandler(listofRoles send by frontend)


// Adding the new image in the database
 project.create({
   author:req.session.user._id,
   title: req.body.title,
   description: req.body.description,
   imagePath: path,
   tags:listOfTagsId,
   roles:listOfRolesId
 },function(error,addedProject){
     if(error) return console.log("Error in adding project to database");
     console.log("Project created");
     res.send(addedProject);
   }
 );

});

module.exports = router;
