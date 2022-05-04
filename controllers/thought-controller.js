const { User, Thought } = require('../models');

const thoughtController = {

// get all thoughts
    getAllThought(req, res) {
        Thought.find({})
             .select('-__v')
             .sort({ _id: 1 })
             .then(dbThoughtData => res.json(dbThoughtData))
             .catch(err => {
             console.log(err);
             res.sendStatus(400);
        });  
    },
//get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
             .select('-__v')
             .then(dbThoughtData => res.json(dbThoughtData))
             .catch(err => {
             console.log(err);
             res.sendStatus(400);
          });
      },

// create Thought
    createThought({ body }, res) {
    Thought.create(body)
    .then (({ _id }) => {
             return User.findOneAndUpdate(
             { _id: body.userId },
             { $push: { thoughts: _id } },
             { new: true, runValidators: true }
        );
    })
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.json(err));
  },

// update Thought by id
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
         .then(dbThoughtData => {
         if (!dbThoughtData) {
         res.status(404).json({ message: 'No User found with this id!' });
         return;
         }
         res.json(dbThoughtData);
          })
         .catch(err => res.json(err));
      },

// delete User
deleteThought({ params }, res) {
     Thought.findOneAndDelete({ _id: params.id })
     .then(dbThoughtData => res.json(dbThoughtData))
     .catch(err => res.json(err));
  }
    
}


module.exports = thoughtController;
