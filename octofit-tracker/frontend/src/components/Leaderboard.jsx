import ResourcePage from './ResourcePage.jsx'

function Leaderboard() {
  return (
    <ResourcePage
      description="Celebrate the people and teams making progress."
      endpoint="/api/leaderboard/"
      title="Leaderboard"
    />
  )
}

export default Leaderboard
