import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const verifyUser = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.loggedInUser = await User.findById(payload.userId).select("-password");
            if (!req.loggedInUser) return res.status(401).json({ message: "Invalid token" });
            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: "Invalid token" });
        }
    } else {
        res.status(401).send({ message: "Token is missing" });
    }
}

export const isAuthenticated = (req, res, next) => {
    if (req.loggedInUser.role !== 'instructor')
       return res.status(403).json({ message: "You are not authorized" });
    next();
}

export const isAdmin = (req, res, next) => {
  if (req.loggedInUser.role !== "admin") {
    return res.status(403).json({ msg: "Admin access required" });
  }
  next();
};