const { Schema, model, Types } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
  
    createdAt: {
      type: Date,
      default: Date.now,
    //   get: 
      
     
    },
  
   username: {
       type: String,
       required: true,
   },
  
//    reactions: {
    
  
//    },
  


  });

const thought = model ('thought', thoughtSchema);


const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },

  reactionBody: {
    type: String,
    trim: true,
    required: true,
    
   
  },

 username: {
     type: String,
     required: true,
 },

 createdAt: {
    type: Date,
    
    // get:

 },

//   thoughts: {
    
//   },

//   friends: {
    
// }
});


module.exports = thought;