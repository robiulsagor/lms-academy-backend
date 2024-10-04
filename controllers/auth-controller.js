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

const loginUser = (req, res) => {
    console.log("login");
    res.json("login")
}

module.exports = { registerUser, loginUser }