const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const userModel =  mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timeStamp: true
});


// Hash the password before saving to the database
userModel.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }
    next();
  });
  
  // Method to compare passwords
  userModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const User = mongoose.model("User",userModel);
module.exports = User;