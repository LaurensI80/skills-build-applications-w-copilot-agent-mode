import ResourcePage from './ResourcePage.jsx'

function Activities() {
  return (
    <ResourcePage
      description="See the latest movement logged by your community."
      endpoint="/api/activities/"
      title="Activities"
    />
  )
}

export default Activities
