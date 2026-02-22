import mongoose from "mongoose";

const enrollSchema = mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,          // auto-set current time
  }
});

enrollSchema.index({ user: 1, course: 1 }, { unique: true });

export const Enroll = mongoose.model('Enroll',enrollSchema);