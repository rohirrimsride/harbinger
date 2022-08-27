// const { ObjectId } = require('bson');
// const { Schema } = require('mongoose');
// const formatDate = require('../')

// const ReactionSchema = new Schema(
//     {
//         reactionId: {
//             type: ObjectId,
//             default: new ObjectId
//         },
//         reactionBody: {
//             type: String,
//             required: true,
//             maxLength: 280
//         },
//         username: {
//             type: String,
//             required: true
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             get: (dateTime) => formatDate(dateTime)
//         }
//     },
//     {
//         toJSON: {
//             getters: true
//         }
//     }
// );

// module.exports = ReactionSchema;