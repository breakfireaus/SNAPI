const router = require('express').Router();

const {
    getAllTheUsers,
    getUserByAnId,
    createAUser,
    updateAUser,
    deleteAUser,
    addAFriend,
    removeAFriend
    } = require('../../controllers/user-controller');


// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllTheUsers)
  .post(createAUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserByAnId)
  .put(updateAUser)
  .delete(deleteAUser);

//  /api/users/:id/friends/:friendId
router
  .route('/:id/friends/:friendId')
  .post(addAFriend)
  .delete(removeAFriend);

module.exports = router;