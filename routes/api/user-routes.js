const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend

} = require('../../controllers/user-controller');

// /api/user
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/User/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  router
  .route('/:id/friends/:friendId')
  .post(addFriend);

module.exports = router;