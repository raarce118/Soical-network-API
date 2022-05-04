const { Schema, model, Types } = require("mongoose");

const ThoughtSchema = new Schema(

    {

thoughtText: {
    type: String,
    required: true,
    trim: true
},

createdAt: {
    type: Date,
    default: DateTime.now(),
    get: createdAtVal => createdAtVal.toLocaleString()
},

username: {
    type: String,
    required: true,
    trim: true
},

reactions: []

},

{
    toJSON: {
         virtuals: true,
         getters: true
    },
     id: false
}
);

// get total count of comments and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.friend.length;
  });
  
  const Thought = model('Thought', ThoughtSchema);
  
  module.exports = Thought;