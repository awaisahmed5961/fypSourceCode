const express = require('express');

const Course = require('../models/Course');
const Joi = require('@hapi/joi');

const router = express.Router();

/**
 * @route GET/ api/courses
 * @description Get List of courses
 * @access Public
 */
router.get('/', async (req, res) => {
    const course = await Course
        .find()
        .sort('title');
    res.send(course);
});
/**
 * @route GET/ api/courses
 * @description Get single of courses
 * @access Public
 */
router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        res.status(404).send('Ooops required Course is not existing in the server');
        return;
    }
    res.send(course);
});

/**
 * @route POST / api/courses
 * @description Add course
 * @access Private
 */
router.post('/', async (req, res) => {

    let { error } = courseValidationSchema.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    // Pulling required Information from the Request 
    const { title, subTitle, desc } = req.body;

    try {
        // Creation object of the Course Model
        course = new Course({
            title,
            subTitle,
            desc
        });

        await course.save();

        res.status(200).send(course);
    }
    catch (error) {
        res.status(500).send('Server Error');
    }
});

/**
 * @route Put / api/courses/:id
 * @description update course
 * @access Private
 */
router.put('/:id', (req, res) => {
    res.send('update contact!');
});

/**
 * @route DELETE / api/courses
 * @description remove course
 * @access Private
 */
router.delete('/:id', (req, res) => {
    res.send('Removex contact!');
});

// Schema Validation 
const courseValidationSchema = Joi.object({
    title: Joi.string()
        .min(1).max(50).required(),
    subTitle: Joi.string().min(1).max(50).required(),
    desc: Joi.string().required().max(300),
});
module.exports = router;