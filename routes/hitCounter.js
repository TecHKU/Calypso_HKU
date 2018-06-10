var express = require('express');
var router = express.Router();
var Project= require('../models/project');

let standardResponse = {
    success: false,
    reason: "none"
};
// get projectId and increase the hit count of that project
router.post('/',function(req,res){

  Project.findById(req.body.projectId,function(error,project){
    if(!project){
      standardResponse.reason = "Project Id does not exists";
      return res.send(standardResponse);
    }
    else if(error){
      standardResponse.reason = "Database accessing error:"+ error;
      return res.send(standardResponse);
    }
    else{
      project.hitCount=project.hitCount+1;
      project.save(function(error){
        if(error)
          standardResponse.reason = "Database adding error:"+ error;
        else {
          standardResponse.success = true;
        }
        return res.send(standardResponse);
      })
    }
  })
})

module.exports = router;
