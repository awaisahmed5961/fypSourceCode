const request = require('supertest');
const Course = require('../../models/Course');
const RegisterCourse = require('../../models/RegisterCourse');
const Learner = require('../../models/Learner');
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
let server = null;



describe('Course Registeration For Learner', () => {
    beforeEach(() => {
        server = require('../../server');
    });
    afterEach(() => {
        server.close();
    })
    describe('GET list of registerd course ', () => {
        var token = "";
        var user_id;
        beforeEach(async () => {

            let dummyUser = {
                name: "awais",
                email: "awaisahmedtest123@gmail.com",
                password: "testawais123"
            }

            user = new Learner(dummyUser);

            const salt = await bcrypt.genSalt(10);
            // hassing User password by providing planepassword and salt
            user.password = await bcrypt.hash(dummyUser.password, salt);
            await user.save();

            // Creating palyload for Json Web Token in this payload we simply add user id

            const payload = {
                user: {
                    id: user.id
                }
            }


            token = jwt.sign(payload, config.get('jwtSecret'))
            user_id = user._id
        });
        afterEach(async () => {
            await Learner.collection.deleteMany({})
            await Course.remove({})
        });

        const exec = async () => {
            return await request(server)
                .get('/api/registercourses')
                .set('x-auth-token', token)
        }

        it('should return 200 if list of Registerd courses', async () => {

            const res = await exec();
            expect(res.status).toBe(200);
        })
    });

    describe('GET /:id', () => {
        var user_id;
        var token = "";
        var course_id = null

        beforeEach(async () => {

            let dummyUser = {
                name: "awais",
                email: "awaisahmedtest123@gmail.com",
                password: "testawais123"
            }

            user = new Learner(dummyUser);

            const salt = await bcrypt.genSalt(10);
            // hassing User password by providing planepassword and salt
            user.password = await bcrypt.hash(dummyUser.password, salt);
            await user.save();

            // Creating palyload for Json Web Token in this payload we simply add user id

            const payload = {
                user: {
                    id: user.id
                }
            }

            token = jwt.sign(payload, config.get('jwtSecret'))
            user_id = user._id;
        });
        afterEach(async () => {
            await Learner.collection.deleteMany({})
        });

        let exec = async () => {
            return await request(server)
                .get(`/api/registercourses/${course_id}`)
                .set('x-auth-token', token)

        }

        it('should return a details of single registered course', async () => {
            const course = new Course({
                title: "test course 1",
                subTitle: "test course subtitle",
                description: "test course description",
                educator_id: user_id,
                ImagePlaceholder:
                    'https://guarded-shelf-88919.herokuapp.com/api/uploads/list placeholder.jpg',
            });
            await course.save();
            course_id = course._id;

            // Creation object of the RegisterCourse Model
            const registerCourse = new RegisterCourse({
                course_id: course_id,
                learner_id: user_id
            });

            await registerCourse.save();

            const res = await exec();
            expect(res.status).toBe(200);
        })
    });

    describe('POST /', () => {
        var user_id = null;
        var token = "";
        var course_id = null;

        var registerCourseObj;

        const exec = async () => {
            return await request(server)
                .post('/api/registercourses')
                .set('x-auth-token', token)
                .send(registerCourseObj);
        }

        beforeEach(async () => {

            registerCourseObj = {
                course_id: course_id,
                learner_id: user_id
            }

            let dummyUser = {
                name: "awais",
                email: "awaisahmedtest123@gmail.com",
                password: "testawais123"
            }

            user = new Learner(dummyUser);

            const salt = await bcrypt.genSalt(10);
            // hassing User password by providing planepassword and salt
            user.password = await bcrypt.hash(dummyUser.password, salt);
            await user.save();

            // Creating palyload for Json Web Token in this payload we simply add user id

            const payload = {
                user: {
                    id: user.id
                }
            }


            token = jwt.sign(payload, config.get('jwtSecret'))
            user_id = user._id
        });
        afterEach(async () => {
            await RegisterCourse.collection.deleteMany({})
            await Learner.collection.deleteMany({})
        });

        it("should return 400 if course_id is not provided", async () => {
            registerCourseObj = {
                learner_id: user_id
            }
            const res = await exec();
            expect(res.status).toBe(400)
        });

        it("should return 404 if Course Id is invalid", async () => {
            registerCourseObj.course_id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404)

        });
        it("should return 401 if course is already registered", async () => {
            const course = new Course({
                title: "test course 1",
                subTitle: "test course subtitle",
                description: "test course description",
                educator_id: user_id,
                ImagePlaceholder:
                    'https://guarded-shelf-88919.herokuapp.com/api/uploads/list placeholder.jpg',
            });
            await course.save();
            registerCourseObj.course_id = course._id;
            course_id = course._id;

            // Creation object of the RegisterCourse Model
            const registerCourse = new RegisterCourse({
                course_id: course_id,
                learner_id: user_id
            });

            await registerCourse.save();

            const res = await exec();
            expect(res.status).toBe(401)

        });

        it("should return 200 if course is register", async () => {

            const course = new Course({
                title: "test course 1",
                subTitle: "test course subtitle",
                description: "test course description",
                educator_id: new Array(user_id),
                ImagePlaceholder:
                    'https://guarded-shelf-88919.herokuapp.com/api/uploads/list placeholder.jpg',
            });
            await course.save();
            course_id = course._id;

            const res = await exec();
            expect(res.status).toBe(200)
        });
    })
})
