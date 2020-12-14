const Learner = require('../../models/Learner')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const config = require("config");
const request = require("supertest")
describe(' Learner Registeration ', () => {
    beforeEach(() => {
        server = require('../../server');
    });
    afterEach(() => {
        server.close();
    })

    describe('Learner Sign Up ', () => {
        var token = "";
        userObj = {
            name: "",
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
                .post('/api/learners')
                .send(userObj);

        }

        it("should return 400 if Learner name , email & password is not provided", async () => {
            userObj = {
                name: ''
            }
            const res = await exec();
            expect(res.status).toBe(400)
        });
        it("should return 400 if Learner email Already exists", async () => {
            userObj.email = "testemail1@gmail.com";
            const res = await exec();
            expect(res.status).toBe(400)
        });
        it("should return 200 if Learner is save inDatabase", async () => {
            userObj.name = "test user 2"
            userObj.email = "testemail1@gmail.com";
            userObj.password = "123"
            const res = await exec();
            expect(res.status).toBe(200)
        });
        it("should return JW Token if Learner is saved In Database", async () => {
            userObj.name = "test user 2"
            userObj.email = "testemail1@gmail.com";
            userObj.password = "123"
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("token")
        });
    })



})

