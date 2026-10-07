import ResourcePage from './ResourcePage.jsx'

function Users() {
  return (
    <ResourcePage
      description="Meet the members of your Octofit community."
      endpoint="/api/users/"
      title="Users"
    />
  )
}

export default Users
