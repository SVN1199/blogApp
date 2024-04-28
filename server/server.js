const app = require('./app')
const path = require('path')
const dotenv = require('dotenv').config({path : path.join(__dirname, 'config/config.env')})
const port = process.env.PORT || 5000
const connectDatabase = require('./config/db')

connectDatabase()

const server = app.listen(port, () => {
    console.log(`Server Running on ${port}`)
})

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(() => {
        process.exit(1);
    })
})

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(() => {
        process.exit(1);
    })
})