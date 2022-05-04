const { Schema, model, Types } = require("mongoose");

const ThoughtSchema = new Schema(

    {

thoughtText: {
    type: String,
    required: true,
    minLength: [1, 'Needs to be between 1 and 280 characters!'],
    maxLength: [2, 'Needs to be between 1 and 280 characters!'],
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

reactions: [ReactionsSchema]

},
{
    toJSON: {
         virtuals: true,
         getters: true
    },
     id: false
}
);




const ReactionsSchema = new Schema(

    {

reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
},

reactionBody: {
    type: String,
    required: true,
    maxLength: [280, 'Cannot be over 280 characters!']

},

username: {
    type: String,
    required: true,
    trim: true
},

createdAt: {
    type: Date,
    default: DateTime.now(),
    get: createdAtVal => createdAtVal.toLocaleString()
},



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