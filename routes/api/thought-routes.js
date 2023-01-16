const router = require('express').Router();


const {
    getAllUserThoughts,
    getOneThoughtById,
    createAThought,
    updateAThought,
    deleteAThought,
    addAReaction,
    removeAReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/
router
    .route('/')
    .get(getAllUserThoughts)
    .post(createAThought);

    // /api/thoughts/<thoughtId>
router
    .route('/:id')
    .get(getOneThoughtById)
    .put(updateAThought)
    .post(addAReaction)
    .delete(deleteAThought);

    // /api/thoughts/<thoughtId>/<reactionId>
router
    .route('/:id/:reactionId')
    .delete(removeAReaction);

module.exports = router