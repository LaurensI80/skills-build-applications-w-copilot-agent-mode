import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigationItems = [
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function Home() {
  return (
    <section className="welcome-card">
      <p className="eyebrow">Your fitness community</p>
      <h1>Make every move count.</h1>
      <p className="welcome-copy">
        Track your activity, find your team, and celebrate progress together.
      </p>
      <div className="welcome-actions">
        <Link className="btn btn-primary" to="/activities">
          Explore activities
        </Link>
        <Link className="btn btn-outline-primary" to="/leaderboard">
          View leaderboard
        </Link>
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <section className="empty-state">
      <h1>Page not found</h1>
      <Link to="/">Return to Octofit</Link>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <nav className="navbar navbar-dark container">
          <Link className="navbar-brand" to="/">
            <span className="brand-mark" aria-hidden="true">
              O
            </span>
            Octofit
          </Link>
          <div className="navbar-nav flex-row flex-wrap ms-auto">
            {navigationItems.map(({ label, to }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
                key={to}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="container app-main">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </main>
      <footer className="app-footer">
        <div className="container">
          Octofit Tracker <span aria-hidden="true">·</span> Move together.
        </div>
      </footer>
    </div>
  )
}

export default App
