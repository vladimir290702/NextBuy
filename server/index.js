const express = require('express')
const connectDB = require('./database.js')
const cors = require('cors')
const itemModel = require('./models/Item.js')

const app = express()
app.use(express.json())
app.use(cors())

connectDB()

app.get('/', async (req, res) => {
    const items = await itemModel.find()

    return res.json({items})
})

app.listen(3000, () => {
    console.log('app is running')
})