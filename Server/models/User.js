import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type:String,
        enum:["instructor","learner","admin"],
        default: "learner"
    },
});

userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model('User',userSchema);