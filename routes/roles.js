var express = require('express');
var router = express.Router();
var Roles=require('../models/role');


router.get('/',function(req,res){
  Roles.find({},function(error,roles){
    if(error){
      console.log("error in accessing roles database");
      return res.send([]);
    }
    var roleList=[];
    roles.forEach(function(role){
      roleList.push(role.name);
    })
    return res.send(roleList);
  })
})
module.exports = router;
