const { User, Thought } = require('../models');


// Used same template as pizza module. 
const userController = {
// get all Users

getAllUser(req, res) {
    User.find({})
         .select('-__v -thoughts')
         .sort({ _id: -1 })
         .then(dbUserData => res.json(dbUserData))
         .catch(err => {
         console.log(err);
         res.sendStatus(400);
    });  
},


// get one User by id
getUserById({ params }, res) {
    User.findOne({ _id: params.id })
         .populate({
         path: 'thoughts',
         select: '-__v'
      })
         .select('-__v')
         .then(dbUserData => res.json(dbUserData))
         .catch(err => {
         console.log(err);
         res.sendStatus(400);
      });
  },

// create User
createUser({ body }, res) {
    User.create(body)
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.json(err));
  },

// update User by id
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
         .then(dbUserData => {
         if (!dbUserData) {
         res.status(404).json({ message: 'No User found with this id!' });
         return;
         }
         res.json(dbUserData);
          })
         .catch(err => res.json(err));
      },

// delete User
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

// add friend

addFriend({ params }, res ) {
   Promise.all([
     User.findOneAndUpdate(
       { _id:params.id },
       { $push: { friends: params.friendId } },
       { new: true, runValidators: true }
     ),
     User.findOneAndUpdate(
       { _id: params.friendId },
       { $push: { friends: params.id } },
       { new: true, runValidators: true }
     )
   ])
   .then(([dbUserData, dbFriendData]) => {
     if( !dbUserData || !dbFriendData ) {
       res.status(404).json({ message: 'No User found with this id!'  })
       return;
     }
       res.json(dbUserData);
   })
}


};

module.exports = userController;