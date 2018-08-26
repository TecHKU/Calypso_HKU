var express = require('express');
var router = express.Router();
var Project= require('../models/project');
var Account = require('../models/account');
const tagHandler = require('./tagHandler');
const roleHandler = require('./roleHandler');

var authenticate = function(req,res,next){
  if (req.session && req.session.user) return next();
  return res.send('not authenticated/ not signed');
}

function createProject(pAuthor,pTitle,pDescription,pImagePath, pCampaign, tagList, roleList, callback){
	Project.create({
		author:pAuthor,
		title: pTitle,
		description:pDescription,
		imagePath:pImagePath,
		hitCount:0,
		campaign: pCampaign,
		tags: tagList,
		roles: roleList,
	}, (error, addedProject) => {
		if (error) {
			callback(false, error);
		}
		console.log("Project created by"+ pAuthor);
		// adding projectid into the user's projects
		Account.findByIdAndUpdate(pAuthor, { $push: { projects:addedProject._id }}, (err,acc) => {
			if (err) {
				console.log("error in adding project to the account details");
				callback(false, error);
			}
			console.log("pushed in user project");
			callback(true, null);
		});
	});
}


router.post('/',authenticate,function(req, res, next) {
	console.log("Request Body : ", req.body);
	//synchronously calling three functions
	tagHandler(req.body.tags, (tagList) => {
		roleHandler(req.body.roles, (roleList) => {
			createProject(
				req.session.user._id,
				req.body.title,
				req.body.description,
				req.body.imagePath,
				req.body.campaign,
				tagList,
				roleList,
				(success, reason) => {
					res.send({success, reason});
			});
		});
	});

});

module.exports = router;
