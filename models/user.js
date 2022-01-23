const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    // match
   
  },

//   thoughts: {
    
//   },

//   friends: {
    
// }
});

const Note = model('user', userSchema);

module.exports = user;
