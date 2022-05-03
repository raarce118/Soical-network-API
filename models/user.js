const { Schema } = require("mongoose");

const { schema, model } = require('mongoose');

 // var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; <-- stack overflow Match and Validate property

 // Used format from pizza hunt module. Username, email, thoughts, and friends required for this challenge.
const UserSchema =  new Schema(
{

     userName: {
         type: String,
         required: true,
         unique: true,
         trim: true
    },

     email: {
         type: String,
         required: true,
         unique: true,
         //validate: [validateEmail, 'Please use a valid email address'],
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
 // Similar to comments array from pizza hunt module. Thoughts will be coming from User
     thoughts: [
        {
         type: Schema.Types.ObjectId,
         ref: 'Thought'
        }
    ],
     friends: [
         {
         type: Schema.Types.ObjectId,
         ref: 'User'
         }
     ]
},
{
    toJSON: {
         virtuals: true,
         getters: true
    },
 // prevents virtuals from creating duplicate of _id as `id`    
         id: false
}
);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friend.length;
  });
  
  const User = model('User', UserSchema);
  
  module.exports = User;