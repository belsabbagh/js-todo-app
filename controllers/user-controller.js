const {validate, isEmpty} = require('../validation/validate')
const {signupSchema, loginSchema} = require('../validation/schemas/user')
const {addUser, getUsers, getUser} = require('../services/user')
const {IncorrectCredentialsError} = require('../middleware/errors')
module.exports = (app) => {
    app.get('/user', async (req, res, next) => {
        try {
            res.status(200).json(await getUsers())
        }
        catch (err) {
            next(err)
        }
    });

    app.post('/signup', async (req, res, next) => {
        try {
            let user = await validate(signupSchema, req.body);
            res.status(200).json(await addUser(user));
        }
        catch (err) {
            next(err)
        }
    });

    app.post('/login', async (req, res, next) => {
        try {
            let user = await validate(loginSchema, req.body);
            let result = await getUser(user);
            if (isEmpty(result)) throw new IncorrectCredentialsError('Incorrect Credentials to login');
            res.status(200).json(result);
        }
        catch (err) {
            next(err)
        }
    })
}