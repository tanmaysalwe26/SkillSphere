import { compareSync, hashSync } from "bcrypt";
import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashed = hashSync(password, 12);
        const user = new User({
            name,
            email,
            password: hashed,
            role: role || "learner",
        });
        await user.save();
        res.status(201).json({ msg: "User Created", user })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ msg: "Wrong Email" });

        const match = compareSync(password, user.password);
    if (!match) return res.status(404).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
      msg:"Login Successful"
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}