const express = require("express")
const { loginUser, registerUser } = require("../controllers/auth-controller")
const authenticate = require("../middlewares/auth-middleware")
const router = express()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/check-auth', authenticate, (req, res) => {
    const user = req.user
    res.json({
        success: true,
        message: "User authenticated",
        data: { user }
    })
})

// the next 2 endpoints are just for test purpose
router.post('/set', (req, res) => {
    res.cookie("cookie", "newCookieSet").json({ success: true, message: "Cookie set" })
})
router.get('/get', (req, res) => {
    const cookie = req.cookies.token
    res.json({ success: true, cookie })
})

module.exports = router