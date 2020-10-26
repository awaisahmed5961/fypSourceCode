const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
const ExerciseQuestions = require('../models/ExerciseQuestions');
Joi.objectId = require('joi-objectid')(Joi)
const router = express.Router();

/**
 * @route GET/ api/assessmentExercise 
 * * @description Get List of assessmentExercise
 * @access Private
 */

router.get('/', auth, async (req, res) => {
    let AssessmentExercise_id = '';
    if (req.header('AssessmentExercise_id')) {
        AssessmentExercise_id = req.header('AssessmentExercise_id');

    }
    else {
        AssessmentExercise_id = req.body.AssessmentExercise_id;
    }
    const exerciseQuestions = await ExerciseQuestions.find({ AssessmentExercise_id: mongoose.Types.ObjectId(AssessmentExercise_id) });
    if (!exerciseQuestions) {
        return (res.status(404).send('No Question with this exercise Id'));
    }
    else {
        res.send(exerciseQuestions);
    }

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


    const { AssessmentExercise_id, Question, CorrectOption } = req.body;

    try {
        exerciseQuestion = new ExerciseQuestions({
            Question,
            CorrectOption,
            AssessmentExercise_id,
        });
        await exerciseQuestion.save();
        res.status(200).send(exerciseQuestion);
    }
    catch (error) {
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