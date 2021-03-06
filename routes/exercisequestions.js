const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
const ExerciseQuestions = require('../models/ExerciseQuestions');
const QuestionsOption = require('../models/QuestionOptions');

Joi.objectId = require('joi-objectid')(Joi)
const router = express.Router();

/**
 * @route GET/ api/assessmentExercise 
 * * @description Get List of assessmentExercise
 * @access Private
 */

router.get('/', auth, async (req, res) => {
    let topic_id = '';
    if (req.header('topic_id')) {
        topic_id = req.header('topic_id');
    }
    else {
        topic_id = req.body.topic_id;
    }


    ExerciseQuestions.aggregate([
        { $match: { topic_id: mongoose.Types.ObjectId(topic_id) } },
        {
            $lookup: {
                from: "questionoptions", // collection name in db
                localField: "_id",
                foreignField: "Question_id",
                as: "Options"
            }
        },

    ]).exec(function (err, options) {
        // students contain WorksnapsTimeEntries
        res.send(options)
    });
});

/**
 * @route GET/ api/coursestopic
 * @description Get single of courses
 * @access Private
 */

router.get('/:id', async (req, res) => {
    const assessmentExercise = await AssessmentExercise.findById(req.params.id);
    if (!assessmentExercise) {
        res.status(404).send('Assessment exercise Id is invalid');
        return;
    }
    else {
        res.send(assessmentExercise);
    }

});


/**
 * @route POST / api/coursestopic
 * @description Add coursetopic
 * @access Private
 */
router.post('/', auth, async (req, res) => {

    const { topicId, questions } = req.body;
    if (!questions) {
        console.log("no question")
    }
    else {
        questions.map((question) => {
            try {
                exerciseQuestion = new ExerciseQuestions({
                    Question: question.question,
                    CorrectOption: question.correctOption,
                    topic_id: topicId
                });
                exerciseQuestion.save().then((q) => {
                    // console.log(q);
                    question.options.map((option) => {
                        try {
                            questionsOption = new QuestionsOption({
                                Option: option,
                                Question_id: q._id
                            });
                            questionsOption.save();
                        }
                        catch (error) {
                            console.log(error)
                            res.status(500).send('Server Error');
                        }
                    })
                })

            }
            catch (error) {
                res.status(500).send('Server Error');
            }
        })
        res.status(200).send(questions);
    }

});

/**
 * @route Put / api/courses/:id
 * @description update course
 * @access Private
 */
router.put('/:id', async (req, res) => {

    const { exerciseTitle, exerciseSubTitle } = req.body;
    const updateAssessmentExercise = {};
    if (exerciseTitle) {
        updateAssessmentExercise.exerciseTitle = exerciseTitle;
    }
    if (exerciseSubTitle) {
        updateAssessmentExercise.exerciseSubTitle = exerciseSubTitle;
    }
    try {
        const assessExercise = await AssessmentExercise.findById(req.params.id);
        if (!assessExercise) {
            res.status(404).send('Assessment Exercise id is invalid');
        }

        const assessmentExercise = await AssessmentExercise.findByIdAndUpdate(req.params.id,
            { $set: updateAssessmentExercise },
            { new: true });


        res.status(200).send('Assessment Exercise  updated');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


/**
 * @route DELETE / api/course
 * @description remove course
 * @access Private
 */
router.delete('/:id', async (req, res) => {

    const questions = await ExerciseQuestions.find({ topic_id: req.params.id });
    if (!questions) {
        return res.send("no Question found with this id");
    }
    let questionCounter = 0;

    questions.map(async (question) => {
        await QuestionsOption.deleteMany({ Question_id: question._id }).then((answer) => {
        }).catch((err) => {
            console.log(err);
        })
    })
    questions.map(async (question) => {
        await ExerciseQuestions.deleteOne({ _id: question._id }).then((answer) => {
            ++questionCounter;
            if (questionCounter >= questions.length) {
                return res.send("success").status(200)
            }
        }).catch((err) => {
            console.log(err);
        })
    })


    // try {
    //     exerciseQuestion = new ExerciseQuestions({
    //         Question: question.question,
    //         CorrectOption: question.correctOption,
    //         topic_id: topicId
    //     });
    //     exerciseQuestion.save().then((q) => {
    //         // console.log(q);
    //         question.options.map((option) => {
    //             try {
    //                 questionsOption = new QuestionsOption({
    //                     Option: option,
    //                     Question_id: q._id
    //                 });
    //                 questionsOption.save();
    //             }
    //             catch (error) {
    //                 console.log(error)
    //                 res.status(500).send('Server Error');
    //             }
    //         })
    //     })

    // }
    // catch (error) {
    //     res.status(500).send('Server Error');
    // }
    // try {
    //     const assessmentExercise = await AssessmentExercise.findById(req.params.id);

    //     if (!assessmentExercise) return res.status(404).send('Assessment Exercise with this id does not exists');
    //     await AssessmentExercise.findByIdAndRemove(req.params.id);
    //     res.status(200).json('Assessment Exercise deleted');

    // } catch (err) {
    //     res.status(500).send('Server error');
    // }

});


module.exports = router;