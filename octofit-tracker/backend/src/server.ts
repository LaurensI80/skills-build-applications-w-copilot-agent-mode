import express, { type ErrorRequestHandler } from 'express';
import activity from './models/activity.js';
import leaderboard from './models/leaderboard.js';
import team from './models/team.js';
import user from './models/user.js';
import workout from './models/workout.js';
import { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await user.find().lean().exec());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await team.find().populate('members').lean().exec());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await activity.find().populate('user').lean().exec());
});

app.get('/api/leaderboard/', async (_request, response) => {
  const standings = await leaderboard
    .find()
    .populate('user')
    .sort({ points: -1 })
    .lean()
    .exec();

  response.json(standings);
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await workout.find().lean().exec());
});

app.use((_request, response) => {
  response.status(404).json({ error: 'Not found' });
});

const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

export async function startServer(): Promise<void> {
  await connectDatabase();

  await new Promise<void>((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
      resolve();
    });

    server.once('error', reject);
  });
}

export default app;
