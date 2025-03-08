const express = require("express");
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const User = require("../model/userModel"); // Import User model
const router = express.Router();
const dotenv = require("dotenv")
const toast = require("react-toastify")
dotenv.config()

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Only check email for admin status (NOT password)
        const isAdmin = email === process.env.EMAIL; 

        // Create new user with hashed password and admin status
        const newUser = new User({ name, email, password: hashedPassword, isAdmin });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", isAdmin: newUser.isAdmin });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email doesn't exist" });
        }

        // Await bcrypt password comparison
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        // Check if the user is an admin
        if(email === process.env.EMAIL && password === process.env.PASSWORD){
            user.isAdmin = true;
            await user.save();
        }

        // Send response with updated user data
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin, 
            message: "Login successful",
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});



router.get("/getallusers", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.post("/deleteuser", async (req, res) => {
    const userid = req.body.userid
    try {
        await User.findOneAndDelete({ _id: userid })
        res.send("User deleted successfully")
    } catch (error) {
        return res.status(400).json({ message: error })
    }
});
module.exports = router
