var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  title: {type:String, required: true},
  description:{type:String, required:true},
  //image:{ data: Buffer, contentType: String }
  imagePath:{type:String,required:true}

})

module.exports=mongoose.model('project',projectSchema);
