const mongoose = require('mongoose');


const EducatorSchema = mongoose.Schema({
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
        default: 'https://guarded-shelf-88919.herokuapp.com/api/learner/avatar/defaultAvatar.svg'
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('educator', EducatorSchema);