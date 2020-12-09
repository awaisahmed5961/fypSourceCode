const mongoose = require('mongoose');
const { number } = require('@hapi/joi');

const CourseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    ImagePlaceholder: {
        type: String,
        default: 'https://guarded-shelf-88919.herokuapp.com/api/uploads/list placeholder.jpg'
    },
    date: {
        type: Date,
        default: Date.now
    },
    publication_Status: {
        type: Number,
        default: 1
    },
    // act as a forign key
    educator_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'educator'
    }]


});

module.exports = mongoose.model('course', CourseSchema);