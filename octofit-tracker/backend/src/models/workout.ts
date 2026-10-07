import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    duration: { type: Number, min: 1 },
    target: { type: String, trim: true },
  },
  { timestamps: true },
);

const workout = mongoose.models.workout ?? mongoose.model('workout', workoutSchema, 'workouts');

export default workout;
