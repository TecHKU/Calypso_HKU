var express = require('express');
var router = express.Router();
var Tags=require('../models/tag');

router.get('/',function(req,res){
  Tags.find({},function(error,tags){
    if(error){
      console.log("error in accessing tags database");
      return res.send([]);
    }
    var tagList=[];
    tags.forEach(function(tag){
      tagList.push(tag.name);
    })
    return res.send(tagList);
  })
})
module.exports = router;
