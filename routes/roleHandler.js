var Roles = require('../models/role');
var forEachAsync = require('forEachAsync').forEachAsync;

function roleHandler(list,callback){
	//synchronously looping
	let roleList = [];
	forEachAsync(list,function (next,string, index, array) {
		Roles.findOne({name: string},function(error,role) {
			if (error) {
				console.log("Error in accessing database");
				next();
			}
			if (!role) {
				Roles.create({name: string},function(error,addedRole) {
					if (error) {
						console.log("Error in adding roles to database");
					}
					else {
						console.log("role created"+addedRole.name);
						roleList.push(addedRole.name);
					}
					next();
				});
			}
			else {
				roleList.push(role.name);
				next();
			}
		})
	}).then(function() {
		console.log(roleList+"roles");
		callback(roleList);
	});

}
module.exports = roleHandler;