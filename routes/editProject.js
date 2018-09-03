var express = require('express');
var router = express.Router();
var Project = require('../models/project');
const tagHandler = require('./tagHandler');
const roleHandler = require('./roleHandler');

var authenticate = function(req,res,next){
  if (req.session && req.session.user) return next();
  return res.send('not authenticated/ not signed');
}

router.post('/', authenticate, (req, res, next) => {
	let standardResponse = {
		success: false,
		reason: "none"
	};
	Project.findOne({"_id": req.body._id, "author": req.session.user._id}, (error, project) => {
		if (error) {
			console.log("Error in searching project " + error);
			standardResponse.reason = "Error in adding project to database " + error;
			res.send(standardResponse);
		} else if (!project) {
			console.log("Project Id doesnot exist");
			standardResponse.reason = "Project Id doesnot exist";
			res.send(standardResponse);
		} else {
			tagHandler(req.body.tags, (tagList) => {
				roleHandler(req.body.roles, (roleList) => {
					project.title = req.body.title;
					project.description = req.body.description;
					project.imagePath = req.body.imagePath;
					project.campaign = req.body.campaign;
					project.tags = tagList;
					project.roles = roleList;
					project.save((err) => {
						if (err) {
							standardResponse.reason = "Error in adding project to database " + error;
						} else {
							standardResponse.success = true;
						}
						res.send(standardResponse);
					})
				});
			});
		}
	})
});

module.exports = router;
