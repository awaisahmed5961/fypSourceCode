const mongoose = require('mongoose');

const questionOptionsSchema = mongoose.Schema({
    Option: {
        type: String,
        required: true,
    },

    // act as a forign key
    Question_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exerciseQuestion'
    }]


});

module.exports = mongoose.model('questionOptions', questionOptionsSchema);