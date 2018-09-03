var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  author: Schema.Types.ObjectId,
  title: {type:String, required: true},
  description: {type:String, required:true},
  imagePath: {type:String,required:true},
  hitCount: { type: Number, default: 0 },
  campaign: {type:String},
  tags: [String],
  roles: [String]

})

module.exports=mongoose.model('project',projectSchema);
