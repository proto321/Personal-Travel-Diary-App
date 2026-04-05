import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";


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