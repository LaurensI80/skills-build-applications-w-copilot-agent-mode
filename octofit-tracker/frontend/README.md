# Octofit Tracker frontend

The presentation tier is a React 19 application built with Vite, React Router,
and Bootstrap. Start the Vite development server from the repository root with:

```bash
npm run dev --prefix octofit-tracker/frontend
```

## API configuration

When running in GitHub Codespaces, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local` using the Codespace name (not its full
URL), for example:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

This variable must be defined for Codespaces so the frontend can reach the API
at `https://<VITE_CODESPACE_NAME>-8000.app.github.dev`. Restart the Vite
development server after changing `.env.local`.

If `VITE_CODESPACE_NAME` is unset, the frontend safely uses
`http://localhost:8000`. The app reads these API endpoints:

- `/api/activities/`
- `/api/leaderboard/`
- `/api/teams/`
- `/api/users/`
- `/api/workouts/`

Responses may be plain arrays or paginated objects with a `results` array. An
object containing a `data` array is also accepted.
