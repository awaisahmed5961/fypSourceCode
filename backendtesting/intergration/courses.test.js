const request = require('supertest');
const Course = require('../../models/Course');
const Educator = require('../../models/Educator')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
let server = null;



describe('/api/courses', () => {
    beforeEach(() => {
        server = require('../../server');
    });
    afterEach(() => {
        server.close();
    })
    describe('GET /', () => {

        var token = "";

        beforeEach(async () => {

            let dummyUser = {
                name: "awais",
                email: "awaisahmedtest123@gmail.com",
                password: "testawais123"
            }

            user = new Educator(dummyUser);

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
        });
        afterEach(async () => {
            await Educator.collection.deleteMany({})
        });

        const exec = async () => {
            return await request(server)
                .get('/api/courses')
                .set('x-auth-token', token)

        }

        it('should return all courses', async () => {
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

            user = new Educator(dummyUser);

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
            await Educator.collection.deleteMany({})
        });

        let exec = async () => {
            return await request(server)
                .get(`/api/courses/${course_id}`)
                .set('x-auth-token', token)

        }

        it('should return a single courses', async () => {

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
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("_id")
        })
    });

    describe('POST /', () => {
        var user_id = null;
        var token = "";
        let courseObj;

        const exec = async () => {
            return await request(server)
                .post('/api/courses')
                .set('x-auth-token', token)
                .send(courseObj);

        }

        beforeEach(async () => {

            courseObj = {
                title: "test course 1",
                subTitle: "test course subtitle",
                description: "test course description",
                educator_id: user_id,
                ImagePlaceholder:
                    'https://guarded-shelf-88919.herokuapp.com/api/uploads/list placeholder.jpg',
            }

            let dummyUser = {
                name: "awais",
                email: "awaisahmedtest123@gmail.com",
                password: "testawais123"
            }

            user = new Educator(dummyUser);

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
            await Course.collection.deleteMany({})
            // clearEducatorFromDb()
            await Educator.collection.deleteMany({})
        });

        it("should return 401 if Educator is not logged in", async () => {
            token = "";
            const res = await exec();
            expect(res.status).toBe(401)
        });

        it("should return 400 if Course title is invalid", async () => {

            courseObj = {
                title: "",
                subTitle: "",
                description: "",
                educator_id: "",
                ImagePlaceholder:
                    '',
            }
            const res = await exec();
            expect(res.status).toBe(400)

        });

        it("should return 200 if Course is valid && Educator is Authenticated", async () => {

            const course = await Course.find({ title: "test course 1" });
            const res = await exec();
            expect(res.status).toBe(200)
            expect(course).not.toBeNull();


        });

        it("should return course if it is save in database", async () => {

            const res = await exec();
            expect(res.body).toHaveProperty('_id');


        });
    })

    describe('PUT/:id', () => {
        var user_id;
        var token = "";
        var course_id = null

        beforeEach(async () => {

            let dummyUser = {
                name: "awais",
                email: "awaisahmedtest123@gmail.com",
                password: "testawais123"
            }

            user = new Educator(dummyUser);

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
            await Educator.collection.deleteMany({})
            await Course.collection.deleteMany({})
        });

        let exec = async () => {
            return await request(server)
                .put(`/api/courses/${course_id}`)
                .set('x-auth-token', token)
                .send({ title: "update title", subTitle: "update Subtitle", description: "update description" })

        }
        it('should Update courses if Educator is authorized and Authenticated & also if course is valid', async () => {

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
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({ title: "update title" })
        })
    });

    describe('DELETE/:id', () => {
        var user_id;
        var token = "";
        var course_id = null

        beforeEach(async () => {

            let dummyUser = {
                name: "awais",
                email: "awaisahmedtest123@gmail.com",
                password: "testawais123"
            }
            user = new Educator(dummyUser);
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
            await Educator.collection.deleteMany({})
        });

        let exec = async () => {
            return await request(server)
                .delete(`/api/courses/${course_id}`)
                .set('x-auth-token', token)

        }
        it('should return 404 if course is not found', async () => {
            course_id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);

        })
        it('should return 200 if course is deleted', async () => {

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
            expect(res.status).toBe(200);
        })

    });


})
