import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

import jwt from "jsonwebtoken"; //it's tokenization.

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username ||
        !email ||
        !password ||
        username === "" ||
        email === "" ||
        password === ""
        ) {

            // message will show if any of the deltails are missing
        // return res.status(400).json({ message: "Fill all required details." });

        return next(errorHandler(400, "Fill all details :)"))
    }
    
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({

        username,
        email,
        password: hashedPassword,
    })

    try {
        await newUser.save(); 
        res.json("SignUp Successful")
    } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error)
    }
}

export const signin = async(req, res, next) => {
    const {email, password} =req.body
    
    if (
        !email ||
        !password ||
        email === "" ||
        password === ""
        ) {

            // message will show if any of the deltails are missing
        return next(errorHandler(400, "Fill all details :)"))
    }
    try {
        const validUser = await User.findOne({email})
    // if not signin
    if (!validUser) {
        return next(errorHandler(400, "User not found"))
        
        
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET) //token generation

        const {password: pass, ...rest} = validUser._doc

        res
        .status(200)
        .cookie("access_token", token,{ //jo hamko token milega use as a cookie ham send karenge
        httpOnly: true, 
        })
        .json(rest)
        
    } catch (error) {
        next(error)
    }
}