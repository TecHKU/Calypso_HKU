var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  author: Schema.Types.ObjectId,
  title: {type:String, required: true},
  description:{type:String, required:true},
  //image:{ data: Buffer, contentType: String }
  imagePath:{type:String,required:true},
  tags: [Schema.Types.ObjectId],
  roles:[Schema.Types.ObjectId]

})

module.exports=mongoose.model('project',projectSchema);
