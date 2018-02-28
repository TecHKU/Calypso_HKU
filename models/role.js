var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
    name: {type:String, required: true},
})

module.exports=mongoose.model('role',roleSchema);
