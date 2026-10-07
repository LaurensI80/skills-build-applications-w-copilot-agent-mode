import useResourceData from '../hooks/useResourceData.js'

function formatLabel(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replaceAll('_', ' ')
    .replace(/^./, (character) => character.toUpperCase())
}

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.map(formatValue).join(', ')
  }

  if (typeof value === 'object') {
    const displayValue =
      value.name ?? value.title ?? value.username ?? value.email ?? value.id
    return displayValue === undefined
      ? JSON.stringify(value)
      : String(displayValue)
  }

  return String(value)
}

function ResourcePage({ description, endpoint, title }) {
  const { data, error, loading } = useResourceData(endpoint)
  const columns = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Octofit Tracker</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <span className="record-count">
          {loading ? 'Loading' : `${data.length} ${data.length === 1 ? 'record' : 'records'}`}
        </span>
      </div>

      {loading && (
        <div className="alert alert-info" role="status">
          Loading {title.toLowerCase()}…
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="empty-state">
          <h2>No {title.toLowerCase()} yet</h2>
          <p>When data is available, it will appear here.</p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="table-responsive resource-table-wrap">
          <table className="table table-hover align-middle resource-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col">
                    {formatLabel(column)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((record, rowIndex) => (
                <tr key={record.id ?? record._id ?? rowIndex}>
                  {columns.map((column) => (
                    <td key={column}>{formatValue(record[column])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ResourcePage
