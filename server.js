const express = require('express')
const cors = require("cors")
const connectDB = require('./config/connectDB')
require("dotenv").config()

const authRoute = require('./routes/auth-route')

const app = express()
connectDB()

app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// routes
app.use("/api/auth", authRoute)

app.get("/test", (req, res) => {
    res.json({ success: true, message: "Hello, World!" })
})

app.listen(5000, () => {
    console.log("server connected!");
})