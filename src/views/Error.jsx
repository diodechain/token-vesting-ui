import React from 'react'

function Error({error}) {
  return <div className="error">
    <h3>Error</h3>
    <p>{error}</p>
  </div>
}

export default Error