const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
const QuestionsOption = require('../models/QuestionOptions');
Joi.objectId = require('joi-objectid')(Joi)
const router = express.Router();

/**
 * @route GET/ api/QuestionOptions 
 * * @description Get List of Question Options
 * @access Private
 */

router.get('/', auth, async (req, res) => {
    let Question_id = '';
    if (req.header('Question_id')) {
        Question_id = req.header('Question_id');

    }
    else {
        Question_id = req.body.Question_id;
    }

    // const questionOptions = await QuestionsOption.find({ Question_id: mongoose.Types.ObjectId(Question_id) })
    //     .populate('Question_id');
    // if (!questionOptions) {
    //     return (res.status(404).send('No Option found with this Question Id'));
    // }
    // else {
    //     res.send(questionOptions);
    // }

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


    const { Option, Question_id } = req.body;

    try {
        questionsOption = new QuestionsOption({
            Option,
            Question_id,
        });
        await questionsOption.save();
        res.status(200).send(questionsOption);
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
    // }
    //     catch (error) {
    //     res.status(500).send('Server Error');
    // }
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
    try {
        const assessmentExercise = await AssessmentExercise.findById(req.params.id);

        if (!assessmentExercise) return res.status(404).send('Assessment Exercise with this id does not exists');
        await AssessmentExercise.findByIdAndRemove(req.params.id);
        res.status(200).json('Assessment Exercise deleted');

    } catch (err) {
        res.status(500).send('Server error');
    }

});


module.exports = router;