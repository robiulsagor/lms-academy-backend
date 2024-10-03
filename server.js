const express = require('express')
const cors = require("cors")
const connectDB = require('./config/connectDB')
require("dotenv").config()

const app = express()
connectDB()

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:5137"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}))

app.get("/test", (req, res) => {
    res.json({ success: true, message: "Hello, World!" })
})

app.listen(5000, () => {
    console.log("server connected!");
})