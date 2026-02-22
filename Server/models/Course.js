import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"]
    }
});

courseSchema.index({ title: 1, description: 1 }, { unique: true });

export const Course = mongoose.model('Course', courseSchema);