const express = require('express')
const connectDB = require('./database.js')

const app = express()

connectDB()


app.listen(3000, () => {
    console.log('app is running')
})