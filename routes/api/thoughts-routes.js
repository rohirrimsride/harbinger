const router = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// router
//     .route('/:userId')
//     .post(createThought);

router
    .route('/:id')
    // .post(createThought)
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:id/reactions')
    .post(createReaction)

router
    .route('/:id/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;