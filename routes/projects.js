var express = require('express');
var router = express.Router();
var Project= require('../models/project');
var forEachAsync = require('forEachAsync').forEachAsync;
var Account= require('../models/account');

router.get('/',function(req,res){
  // array to be sent to frontend with details of all projects
  var modifiedPro=[];
  Project.find({},function(error,projects){
    if(error)
    {
      console.log("error in accessing projects database "+ error);
      res.send([]);
    }
    else if(!projects){
      console.log("no projects");
      res.send([]);
    }
    else
    {

      forEachAsync(projects,function (next,project, index, array){
        // project details of a particular project in the json object
        let p={};
        p["tags"]=project.tags;
        p["hitCount"]=project.hitCount;
        p["description"]=project.description;
        p["imagePath"]=project.imagePath;
        p["title"]=project.title;
        p["roles"]=project.roles;

        Account.findOne({"_id":project.author},function(error,account){
          if(error) return console.log("error in accessing accounts database");
          if (!account) return console.log("author id incorrectly stored");
          else{
            p["author"]=account;        // sending the complete account information of the author of the project
            console.log("push pro");
            modifiedPro.push(p);
            next();
          }

        })

      }).then(function(){
        console.log("projects retrieved");
        res.send(modifiedPro);
      });
    }
  })
})


module.exports = router;
