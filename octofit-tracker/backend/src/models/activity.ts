import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    type: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 1 },
    calories: { type: Number, min: 0 },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

const activity = mongoose.models.activity ?? mongoose.model('activity', activitySchema, 'activities');

export default activity;
