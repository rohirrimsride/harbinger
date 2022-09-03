const router = require('express').Router();
const { 
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    createUserFriend,
    deleteUserFriend
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

// router
//     .route('/:id/friends')
//     .post(createUserFriend)

router
    .route('/:id/friends/:friendId')
    .post(createUserFriend)
    .delete(deleteUserFriend);

module.exports = router;