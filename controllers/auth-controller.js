const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body
        const checkUserExists = await User.findOne({ $or: [{ username }, { email }] })
        if (checkUserExists) {
            return res.json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: hashedPassword, role })
        await user.save()


        res.json({ success: true, message: "User create successfully", user })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || "Error" })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const checkUser = await User.findOne({ email })

        if (!checkUser) {
            return res.json({ success: false, message: "User not found!" })
        }

        const isValidPassword = await bcrypt.compare(password, checkUser.password)
        if (!isValidPassword) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = jwt.sign({
            _id: checkUser._id,
            username: checkUser.username,
            email: checkUser.email,
            role: checkUser.role
        }, process.env.TOKEN_SECRET, { expiresIn: '2m' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        }).json({
            success: true, message: "Logged in", data: {
                user: {
                    _id: checkUser._id,
                    username: checkUser.username,
                    email: checkUser.email,
                    role: checkUser.role
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || "Error" })
    }
}

module.exports = { registerUser, loginUser }
