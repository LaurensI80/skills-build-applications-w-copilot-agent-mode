import { startServer } from './server.js';

startServer().catch((error: unknown) => {
  console.error('Failed to start OctoFit Tracker API:', error);
  process.exit(1);
});
