const mongoose = require('mongoose');

const exerciseQuestionSchema = mongoose.Schema({
    Question: {
        type: String,
        required: true,

    },
    CorrectOption: {
        type: String,
        required: true,
    },

    // act as a forign key
    AssessmentExercise_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accessmentExercise'
    }],
    topic_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic'
    }]


});

module.exports = mongoose.model('exerciseQuestion', exerciseQuestionSchema);