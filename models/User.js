const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            match: [/^\w+([+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        thoughts: [
            {
                thoughtId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Thoughts',
                    unique: true
                }
            }
        ],
        friends: [
            {
                friendId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    unique: true
                }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;