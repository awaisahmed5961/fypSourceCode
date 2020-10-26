const express = require('express');

const RegisterCourse = require('../models/RegisterCourse');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
Joi.objectId = require('joi-objectid')(Joi)
const Course = require('../models/Course');
const router = express.Router();

/**
 * @route GET/ api/registerd courses
 * @description Get List of registerdcourses
 * @access Private
 */
router.get('/', auth, async (req, res) => {
    const listOfCourses = await RegisterCourse
        .find({ learner_id: req.user.id })
        .populate('course_id', '-_id -ImagePlaceholder ')
        .populate({
            path: 'course_id',
            populate: {
                path: 'educator_id',
                model: 'educator',
                select: 'name  email  _id'
            }
        })
    res.send(listOfCourses);
});
/**
 * @route GET/ api/specificRegisteredcourses
 * @description Get single of courses
 * @access Private
 */
router.get('/:id', auth, async (req, res) => {
    const course = await RegisterCourse.find({ course_id: req.params.id });
    if (!course) {
        res.status(404).send('Ooops no register course found with this id');
        return;
    }
    res.send(course);
});

/**
 * @route POST / api/courses
 * @description Add course
 * @access Private
 */
router.post('/', auth, async (req, res) => {

    let { error } = RegistercourseSchemaValidation.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    // Pulling required course Id from the Request 
    const { course_id } = req.body;

    const course = await Course.findById(course_id);

    if (!course) {
        res.status(404).send('Ooops no course with this detail is found');
        return;
    }
    if (!course.publication_Status === 1) {
        res.status(401).send('Course is not published and you can not register untill the course is published')
    }


    const registercourse = await RegisterCourse.find({ course_id: mongoose.Types.ObjectId(course_id) });
    //  const alreadyRegis = await Course.find({ course_id: mongoose.Types.ObjectId(course_id) });
    if (registercourse) {
        res.send("Course is already registered");
    }
    else {
        try {


            // Creation object of the RegisterCourse Model
            registerCourse = new RegisterCourse({
                course_id,
                learner_id: req.user.id
            });

            await registerCourse.save();

            res.status(200).send(registerCourse);
        }
        catch (error) {
            res.status(500).send('Server Error');
        }
    }

});


// Schema Validation 
const RegistercourseSchemaValidation = Joi.object({
    learner_id: Joi.objectId(),
    course_id: Joi.objectId().required(),
    educator_id: Joi.objectId()
});
module.exports = router;