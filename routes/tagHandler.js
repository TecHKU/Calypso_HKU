var Tags = require('../models/tag');
var forEachAsync = require('forEachAsync').forEachAsync;

// creating a list of tag id for the project. Adding new tags to the database if doesnot exist
function tagHandler(list, callback){
	// synchronously looping
	let tagList = [];
	console.log(list);
	forEachAsync(list, function(next,string, index, array) {
		Tags.findOne({name: string},function(error,tag) {
			if (error) {
				console.log("Error in accessing database");
				next();
			}
			if (!tag) {
				Tags.create({name: string},function(error,addedTag) {
					if (error) {
						console.log("Error in adding tags to database");
					} else {
						console.log("Tags created");
						tagList.push(addedTag.name);
					}
					next();
				});
			} else {
				tagList.push(tag.name);
				next();
			}
		})
	}).then(function() {
		console.log(tagList + "tags");
		callback(tagList);
	});
}

module.exports = tagHandler;