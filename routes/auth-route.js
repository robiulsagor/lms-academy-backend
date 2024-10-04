const express = require("express")
const { loginUser, registerUser } = require("../controllers/auth-controller")
const router = express()

router.post('/login', loginUser)
router.post('/register', registerUser)

module.exports = router