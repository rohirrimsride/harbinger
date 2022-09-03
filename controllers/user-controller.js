const { User, Thoughts } = require('../models');

const userController = {
    getAllUsers({ body }, res) {
        console.log(body);
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            // .sort({ _id: -1 })
            .then(dbUserData => {
                console.log(dbUserData);
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getOneUser({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createUser({ body }, res) {
        console.log(body);
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        console.log(body);
        User.findOneAndUpdate({ _id: params.id, }, body)
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'There is no user with that ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    deleteUser({ params, body }, res) {
        console.log({ params, body });
        User.findOneAndDelete(
                { _id: params.id },
                { $pullAll: { thoughts: [] } }
            )
            // .then()
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    createUserFriend({ params }, res) {
        console.log({ params });
        User.findByIdAndUpdate(
                { _id: params.id },
                { $push: { friends: { friendId: params.friendId } } },
                { new: true, runValidators: true }
            )  
            .then(dbUserData => {
                console.log(dbUserData);
                if (!dbUserData) {
                    res.status(404).json({ message: 'There is no user with this ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    deleteUserFriend({ params }, res) {
        console.log({params});
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: { friendsId: params.friendId } } },
            { remove: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};



module.exports = userController;