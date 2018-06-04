var express = require('express');
var router = express.Router();

let standardResponse = {
    success: false,
    reason: ""
};

router.get('/',function(req,res){
  req.session.destroy(function(err) {
    // cannot access session here
    if(err){
      standardResponse.success=false;
      standardResponse.reason="sessionError";
      res.send(standardResponse);
    }
    else {
      standardResponse.success=true;
      standardResponse.reason="none";
      res.send(standardResponse);
    }
  })
})

module.exports = router;
