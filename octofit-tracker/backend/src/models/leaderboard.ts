import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
    points: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

const leaderboard = mongoose.models.leaderboard
  ?? mongoose.model('leaderboard', leaderboardSchema, 'leaderboard');

export default leaderboard;
