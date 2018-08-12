var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
// creating a new schema for account details
var accountSchema = new Schema({
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  fullName: { type: String, required: true},
  isVerified: { type: Boolean,default: false},
  verificationLink: {type: String},
  resetPasswordLink: {type: String},
  projects: [Schema.Types.ObjectId]
})

// function called before the create function in post handler of signup
accountSchema.pre('save',function(next){
  var account= this;
  bcrypt.genSalt(10,function(error,salt){
    bcrypt.hash(account.password,salt,function(e,hash){
      account.password=hash;
        next();
    });
  });
});

// comparing if the password entered is correct
accountSchema.methods.compare = function(pw){

  return bcrypt.compareSync(pw,this.password);
}

module.exports=mongoose.model('account',accountSchema);
