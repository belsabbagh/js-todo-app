require("dotenv").config();
const express = require('express');
const { todoController, userController } = require('./controllers');
const { errorHandler } = require('./middleware/errors')
const bodyParser = require('body-parser')
const verifyToken = require('./middleware/auth')
const { API_PORT, MONGODB_URI } = process.env

try {
    let app = express()
    app.use('/assets', express.static('assets'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use('/todos', verifyToken) // Deactivated to test the api without authentication
    const { databaseConnection } = require('./config/database')
    console.log(`Successfully connected to ${MONGODB_URI}`);
    todoController(app)
    userController(app)
    app.use(errorHandler)
    app.listen(API_PORT)
    console.log(`Server started on port ${API_PORT}`)
    module.exports = app
} catch (err) {
    console.log(err);
    process.exit(1)
}
