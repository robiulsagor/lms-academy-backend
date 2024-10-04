const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token found! Please login again'
            })
        }

        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)
        if (!verifyToken) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token! Please login again'
            })
        }
        req.user = verifyToken
        next()
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        })
    }
}

module.exports = authenticate