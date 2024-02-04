const UserModel = require('../models/UserModel');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const { SECRET = "secretkey" } = process.env.SECRET;

exports.UserSignUp = async (req, res) => {

    try {
        const { username, password, name } = req.body;
        const user = await UserModel.findOne({ username });
        if (user) {
            return res.status(400).json({
                message: "User already exists, Please try Another Username"
            });
        }
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        const newUser = new UserModel({
            username: username,
            password: hashedPassword,
            name: name
        });
        const savedUser = await newUser.save();
        // const token = jwt.sign({ id: savedUser._id }, SECRET);
        res.status(201).send(savedUser);
    } catch (e) {
        res.status(500).json({ message: e.message });
        // res.status(500).json({message: "Internal Server Error"});
    }



}

exports.UserSignIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist, Please Sign Up First!!!"
            });
        }
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Credentials do not match, Try Again!!!"
            });
        }
        const token = jwt.sign({ username: user.username,name:user.name }, SECRET);

        res.status(200).json({ token });

    } catch (e) {
        res.status(500).json({ message: e.message });
        // res.status(500).json({ message: "Internal Server Error" });
    }
}