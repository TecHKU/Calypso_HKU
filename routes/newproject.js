var express = require('express');
var router = express.Router();
var multer = require('multer');
var project= require('../models/project');
var Tags=require('../models/tag');
var Roles=require('../models/role');
var listOfTagsId=[];
var listOfRolesId=[];
var forEachAsync=require('foreachasync').forEachAsync;

router.get('/', function(req, res, next) {
 res.render('addproject');
});


var authenticate = function(req,res,next){
  if (req.session && req.session.user) return next();
  return res.redirect('/login');
}


// creating a list of tag id for the project. Adding new tags to the database if doesnot exist
function tagHandler(list,callback){
  // synchronously looping
  forEachAsync(list,function (next, string, index, array){
    console.log(string+"hahah");
    Tags.findOne({name: string},function(error,tag){
      if (error){
        console.log("Error in accessing database");
        next();
      }
      if (!tag)
      {
        Tags.create({name: string},function(error,addedTag){
          if(error) console.log("Error in adding tags to database");
          else {
            console.log("Tags created");
            listOfTagsId.push(addedTag._id);
          }
          next();
        });
      }
      else{
        listOfTagsId.push(tag._id);
        console.log(tag.name+"pushed");
        next();
      }
    })
  }).then(function(){
    console.log(listOfTagsId+"tags");
    callback();
  });

}

// creating a list of tag id for the project. Adding new tags to the database if doesnot exist
function roleHandler(list,callback){
  //synchronously looping
  forEachAsync(list,function (next, string, index, array){
    console.log(string+"hffff");
    Roles.findOne({name: string},function(error,role){
      if (error){
        console.log("Error in accessing database");
        next();
      }
      if (!role)
      {
        Roles.create({name: string},function(error,addedRole){
          if(error) console.log("Error in adding roles to database");
          else {
            console.log("role created"+addedRole.name);
            listOfRolesId.push(addedRole._id);
          }
          next();
        });
      }
      else
      {
        listOfRolesId.push(role._id);
        console.log(role.name+"pushed");
        next();
      }

    })
  }).then(function(){
    console.log(listOfRolesId+"roles");
    callback();
  });

}

function createProject(pAuthor,pTitle,pDescription,pImagePath){
  project.create({
    author:pAuthor,
    title: pTitle,
    description:pDescription,
    imagePath:pImagePath,
    tags:listOfTagsId,
    roles:listOfRolesId
  },function(error,addedProject){
      listOfTagsId=[];
      listOfRolesId=[];
      if(error) return console.log("Error in adding project to database "+error);
      return console.log("Project created");
    }
  );
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

 //var path = req.files[0].path;
 var path="abc";

/*
var imageName = req.files[0].originalname;
 var imagepath = {};
 imagepath['path'] = path;
 imagepath['originalname'] = imageName;
*/

//synchronously calling three functions
tagHandler(req.body.tag,function(){
  roleHandler(req.body.role,function(){
    createProject(req.session.user._id,req.body.title,req.body.description,path);
    res.send("done");
  });
});

});

module.exports = router;
