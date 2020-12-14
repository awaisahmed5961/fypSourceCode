const express = require('express');
const auth = require('../middlewares/auth');
const RegisterCourse = require('../models/RegisterCourse');

const router = express.Router();

/**
 * @route DELETE / api/cou
 * rse
 * @description remove course
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        const courseID = req.params.id;

        const courseUnregister = await RegisterCourse.find({ course_id: courseID, learner_id: req.user.id });
        if (courseUnregister.length == 0) {
            return res.status(404).send("not found");
        }
        const learner_id = courseUnregister[0].learner_id.toString();
        if (learner_id !== req.user.id)
            return res.status(401).send("un authorized user");

        await RegisterCourse.deleteOne({ course_id: courseID, learner_id: req.user.id });
        res.status(200).send("un registered");



    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }

});

module.exports = router;