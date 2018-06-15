var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var mongodb = require('mongodb');
var Project = require('../models/project');

let standardResponse = {
    success: false,
    reason: "",
    project: ""
};

router.post('/',function(req,res) {
  Project.findByIdAndRemove(req.body.projectId,function(error,project) {
    if (error) {
      standardResponse.reason = "DbError " + error;
    }
    else if (!project) {
      standardResponse.reason = "Project with the id does not exixts";
    }
    else {
      standardResponse.success = true;
      standardResponse.project = project;
    }
    return res.send(standardResponse);
  })
})

module.exports = router;