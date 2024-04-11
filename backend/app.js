const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
const app = express()
const { readdirSync } = require('fs')
require('dotenv').config()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors(
    {
        origin: ['http://localhost:3000'],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true

    }
))

readdirSync('./routers').map((route) => app.use('/api/v1', require('./routers/' + route)))
const server = () => {
    db()
    app.listen(PORT, () => {
        console.log(PORT)
    })
}

server()