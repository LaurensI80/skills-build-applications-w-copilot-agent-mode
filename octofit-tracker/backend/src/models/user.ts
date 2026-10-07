import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 0 },
    fitnessLevel: { type: String, trim: true },
  },
  { timestamps: true },
);

const user = mongoose.models.user ?? mongoose.model('user', userSchema, 'users');

export default user;
