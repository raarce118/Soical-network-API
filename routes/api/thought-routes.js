const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,

} = require('../../controllers/thought-controller');

// /api/Thought
router
  .route('/')
  .get(getAllThought)
  .post(createThought);

// /api/Thought/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

 
router
.route('/:id/reactions')
.post(addReaction);


router
.route('/:id/reactions/:reactionId')
.delete(deleteReaction);



module.exports = router;