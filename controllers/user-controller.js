const { User, Thoughts } = require('../models');
const { deleteThought } = require('./thought-controller');

const userController = {
    getAllUsers({ body }, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            // .sort({ _id: -1 })
            .then(dbUserData => {
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
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body)
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'There is no user with that ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    deleteUser({ params }, res) { 
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                console.log(dbUserData)
                let thoughts = dbUserData.thoughts;
                console.log(thoughts);
                
                const iterator1 = thoughts[Symbol.iterator]();
                let _id;
                for (const value of iterator1) {
                    console.log(value.thoughtId);
                    params.id = value.thoughtId;
                    return deleteThought({_id: params.id});
                }
                
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }); 
        // User.findOneAndDelete({ _id: params.id })
        //     .then(dbUserData => res.json(dbUserData))
        //     .catch(err => res.json(err));
    },

    createUserFriend({ params }, res) {
        User.findByIdAndUpdate(
                { _id: params.id },
                { $push: { friends: { friendId: params.friendId } } },
                { new: true, runValidators: true }
            )  
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'There is no user with this ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    deleteUserFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $pull: { friends: { friendId: params.friendId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};



module.exports = userController;