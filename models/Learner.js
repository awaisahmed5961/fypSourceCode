const mongoose = require('mongoose');

const LearnerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    imageAvatar: {
        type: String,
        default: 'http://localhost:5000/api/learner/avatar/defaultAvatar.svg'
    }
});

module.exports = mongoose.model('learner', LearnerSchema);