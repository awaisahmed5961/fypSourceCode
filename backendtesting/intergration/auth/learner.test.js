const Learner = require('../../../models/Learner')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const config = require("config");
const request = require("supertest")
describe(' Auth Educator ', () => {
    beforeEach(() => {
        server = require('../../../server');
    });
    afterEach(() => {
        server.close();
    })

    describe('Log In Learner', () => {
        var token = "";
        userObj = {
            email: "",
            password: ""
        }
        let dummyUser = {
            name: "awais",
            email: "awaisahmedtest123@gmail.com",
            password: "testawais123"
        }

        beforeEach(async () => {

            user = new Learner(dummyUser);

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(dummyUser.password, salt);
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            token = jwt.sign(payload, config.get('jwtSecret'))
        });
        afterEach(async () => {

            await Learner.collection.deleteMany({})
        });

        const exec = async () => {
            return await request(server)
                .post('/api/auth/learner')
                .send(userObj);

        }

        it("should return 400 if Learner email & user Password is not provided", async () => {
            const res = await exec();
            expect(res.status).toBe(400)
        });
        it("should return 400 if Learner email is wrong", async () => {
            userObj.email = "testemail@gmail.com";
            userObj.password = "123"
            const res = await exec();
            expect(res.status).toBe(400)
        });
        it("should return 400 if Learner Password is wrong", async () => {
            userObj.email = "testemail@gmail.com";
            userObj.password = "123"
            const res = await exec();
            expect(res.status).toBe(400)
        });
        it("should return JW Token if Learner is Authenticated", async () => {
            userObj.email = dummyUser.email;
            userObj.password = dummyUser.password
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("token")
        });
    })



})

