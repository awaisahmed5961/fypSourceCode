const mongoose = require('mongoose');


const CourseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('course', CourseSchema);