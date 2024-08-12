const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const { SECRET = "secretkey" } = process.env.SECRET;

exports.UserSignUp = async (req, res) => {

    try {
        const { name, username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (user) {
            return res.status(400).json({
                message: "User already exists, Please try Another Username"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Credentials do not match, Try Again!!!"
            });
        }
        const token = jwt.sign({ _id: user._id, username: user.username }, SECRET, { expiresIn: '1d' });
        // const userDetails = { username: user.username, name: user.name, _id: user._id }
        const userDetails = user
        res.status(200).json({ token, user: userDetails });

    } catch (e) {
        res.status(500).json({ message: e.message });
        // res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.validate = async (req, res) => {
    //    return;
    // console.log(req)
    const user = req.user;
    // console.log(user);
    try {
        const response = await UserModel.findById({ "_id": user._id })
        if (!response) {
            return res.status(401).json({ message: "User not found" });
        }
        else {
            return res.status(200).json(response);

            // console.log(response);

        }
    } catch (error) {
        res.status(500).json({ message: "Failed to validate user" });
    }

}

exports.updateUserDetails = async (req, res) => {
    const id = req.user._id;

    const updateData = req.user;


    try {


        if (req.body.name) {
            updateData.name = req.body.name;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

        res.json(updatedUser);
    } catch (error) {
        // res.status(500).json({ message: "Failed to update profile." });
        res.status(500).json({ message: error });
    }
}