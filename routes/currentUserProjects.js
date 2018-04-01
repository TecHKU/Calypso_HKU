var express = require('express');
var router = express.Router();
var Project= require('../models/project');

router.get('/',function(req,res,error)
{
  // sending all the projects of the current user
  Project.find({author:req.session.user._id},function(error,projects){
    if(error)
    {
      console.log("error in accessing projects database "+ error);
      res.send([]);
    }
    else if(!projects)
    {
      console.log("no projects");
      res.send([]);
    }
    else
    {
      res.send(projects);
      console.log(projects);
    }
  })

})
module.exports = router;
