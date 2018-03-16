var express = require('express');
var router = express.Router();
var Tags=require('../models/tag');
//var forEachAsync = require('foreachasync').forEachAsync;
var forEachAsync = require('forEachAsync').forEachAsync;

router.get('/',function(req,res){
  Tags.find({},function(error,tags){
    if(error){
      console.log("error in accessing tags database");
      return res.send([]);
    }
    var tagList=[];
    forEachAsync(tags,function (next,tag, index, array){
      tagList.push(tag.name);
      next();
    }).then(function(){
      return res.send(tagList);
      });
    })
});
module.exports = router;
