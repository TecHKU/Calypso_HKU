var express = require('express');
var router = express.Router();
var multer = require('multer');
var Project= require('../models/project');
var Tags=require('../models/tag');
var Roles=require('../models/role');
var Account= require('../models/account');
var listOfTagsId=[];
var listOfRolesId=[];
var forEachAsync = require('forEachAsync').forEachAsync;

router.get('/', function(req, res, next) {
 res.render('addproject');
});


var authenticate = function(req,res,next){
  if (req.session && req.session.user) return next();
  return res.send('not authenticated/ not signed');
}


// creating a list of tag id for the project. Adding new tags to the database if doesnot exist
function tagHandler(list,callback){
  // synchronously looping
    console.log(list);
  forEachAsync(list,function (next,string, index, array){
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
            listOfTagsId.push(addedTag.name);
          }
          next();
        });
      }
      else{
        listOfTagsId.push(tag.name);
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
    console.log(list);
  forEachAsync(list,function (next,string, index, array){
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
            listOfRolesId.push(addedRole.name);
          }
          next();
        });
      }
      else
      {
        listOfRolesId.push(role.name);
        console.log(role.name+"pushed");
        next();
      }

    })
  }).then(function(){
    console.log(listOfRolesId+"roles");
    callback();
  });

}

function createProject(pAuthor,pTitle,pDescription,pImagePath,callback){
  Project.create({
    author:pAuthor,
    title: pTitle,
    description:pDescription,
    imagePath:pImagePath,
    hitCount:0,
    tags:listOfTagsId,
    roles:listOfRolesId
  },function(error,addedProject){
      // emptying the arrays
      listOfTagsId.length=0;
      listOfRolesId.length=0;
      if(error) {return console.log("Error in adding project to database "+error);}
      console.log("Project created by"+ pAuthor);
      // adding projectid into the user's projects
      Account.findByIdAndUpdate(pAuthor,{$push:{projects:addedProject._id}},function(error,acc){
        if(error) console.log("error in adding project to the account details");
        console.log("pushedd in user project ");
        callback()
      });
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
 console.log("Request Body : ", req.body);

  /*
  var imageName = req.files[0].originalname;
   var imagepath = {};
   imagepath['path'] = path;
   imagepath['originalname'] = imageName;
  */

  //synchronously calling three functions
  tagHandler(req.body.tags,function() {
    roleHandler(req.body.roles,function(){
      console.log("Project started by"+ req.session.user._id);
      createProject(req.session.user._id,req.body.title,req.body.description,path,function(){
        res.send("done");
      });
    });
  });

});

module.exports = router;
