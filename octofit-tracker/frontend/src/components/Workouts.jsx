import ResourcePage from './ResourcePage.jsx'

function Workouts() {
  return (
    <ResourcePage
      description="Explore workouts to keep your momentum going."
      endpoint="/api/workouts/"
      title="Workouts"
    />
  )
}

export default Workouts
