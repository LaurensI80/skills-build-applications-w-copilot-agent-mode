import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import activity from '../models/activity.js';
import leaderboard from '../models/leaderboard.js';
import team from '../models/team.js';
import user from '../models/user.js';
import workout from '../models/workout.js';

const ids = {
  users: [
    new mongoose.Types.ObjectId('670000000000000000000001'),
    new mongoose.Types.ObjectId('670000000000000000000002'),
    new mongoose.Types.ObjectId('670000000000000000000003'),
  ],
  teams: [
    new mongoose.Types.ObjectId('670000000000000000000101'),
    new mongoose.Types.ObjectId('670000000000000000000102'),
  ],
  activities: [
    new mongoose.Types.ObjectId('670000000000000000000201'),
    new mongoose.Types.ObjectId('670000000000000000000202'),
    new mongoose.Types.ObjectId('670000000000000000000203'),
    new mongoose.Types.ObjectId('670000000000000000000204'),
    new mongoose.Types.ObjectId('670000000000000000000205'),
    new mongoose.Types.ObjectId('670000000000000000000206'),
  ],
  leaderboard: [
    new mongoose.Types.ObjectId('670000000000000000000301'),
    new mongoose.Types.ObjectId('670000000000000000000302'),
    new mongoose.Types.ObjectId('670000000000000000000303'),
  ],
  workouts: [
    new mongoose.Types.ObjectId('670000000000000000000401'),
    new mongoose.Types.ObjectId('670000000000000000000402'),
    new mongoose.Types.ObjectId('670000000000000000000403'),
    new mongoose.Types.ObjectId('670000000000000000000404'),
  ],
};

async function seedDatabase(): Promise<void> {
  try {
    console.log('Seed the octofit_db database with test data');
    await connectDatabase();

    // Remove only records owned by this deterministic seed, keeping other data intact.
    await user.deleteMany({ _id: { $in: ids.users } });
    await team.deleteMany({ _id: { $in: ids.teams } });
    await activity.deleteMany({ _id: { $in: ids.activities } });
    await leaderboard.deleteMany({ _id: { $in: ids.leaderboard } });
    await workout.deleteMany({ _id: { $in: ids.workouts } });

    await user.insertMany([
      { _id: ids.users[0], name: 'Maya Chen', email: 'maya.chen@example.com', age: 29, fitnessLevel: 'intermediate' },
      { _id: ids.users[1], name: 'Noah Patel', email: 'noah.patel@example.com', age: 34, fitnessLevel: 'advanced' },
      { _id: ids.users[2], name: 'Priya Singh', email: 'priya.singh@example.com', age: 26, fitnessLevel: 'beginner' },
    ]);

    await team.insertMany([
      {
        _id: ids.teams[0],
        name: 'Trailblazers',
        description: 'A team focused on running and outdoor adventures.',
        members: [ids.users[0], ids.users[1]],
      },
      {
        _id: ids.teams[1],
        name: 'Early Birds',
        description: 'Building healthy habits one morning at a time.',
        members: [ids.users[1], ids.users[2]],
      },
    ]);

    await activity.insertMany([
      {
        _id: ids.activities[0],
        user: ids.users[0],
        type: 'running',
        duration: 35,
        calories: 310,
        date: new Date('2026-10-05T07:30:00.000Z'),
      },
      {
        _id: ids.activities[1],
        user: ids.users[0],
        type: 'strength training',
        duration: 45,
        calories: 260,
        date: new Date('2026-10-03T17:00:00.000Z'),
      },
      {
        _id: ids.activities[2],
        user: ids.users[1],
        type: 'cycling',
        duration: 60,
        calories: 520,
        date: new Date('2026-10-05T06:45:00.000Z'),
      },
      {
        _id: ids.activities[3],
        user: ids.users[1],
        type: 'running',
        duration: 28,
        calories: 295,
        date: new Date('2026-10-02T07:00:00.000Z'),
      },
      {
        _id: ids.activities[4],
        user: ids.users[2],
        type: 'swimming',
        duration: 30,
        calories: 230,
        date: new Date('2026-10-04T09:15:00.000Z'),
      },
      {
        _id: ids.activities[5],
        user: ids.users[2],
        type: 'yoga',
        duration: 40,
        calories: 150,
        date: new Date('2026-10-01T16:30:00.000Z'),
      },
    ]);

    await leaderboard.insertMany([
      { _id: ids.leaderboard[0], user: ids.users[0], points: 860 },
      { _id: ids.leaderboard[1], user: ids.users[1], points: 1240 },
      { _id: ids.leaderboard[2], user: ids.users[2], points: 540 },
    ]);

    await workout.insertMany([
      {
        _id: ids.workouts[0],
        name: 'Beginner Interval Run',
        description: 'Alternate easy jogging with short recovery walks.',
        difficulty: 'beginner',
        duration: 25,
        target: 'cardio',
      },
      {
        _id: ids.workouts[1],
        name: 'Full-body Strength Circuit',
        description: 'A balanced circuit of bodyweight strength exercises.',
        difficulty: 'intermediate',
        duration: 35,
        target: 'strength',
      },
      {
        _id: ids.workouts[2],
        name: 'Recovery Flow',
        description: 'A gentle flow to improve mobility and support recovery.',
        difficulty: 'beginner',
        duration: 20,
        target: 'flexibility',
      },
      {
        _id: ids.workouts[3],
        name: 'Endurance Ride',
        description: 'A steady-paced ride focused on aerobic endurance.',
        difficulty: 'advanced',
        duration: 50,
        target: 'endurance',
      },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 6 activities, 3 leaderboard entries, and 4 workouts.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
