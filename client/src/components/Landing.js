import { Link } from 'react-router-dom'

const Landing = () => {
  
  return (
    <div className="view">
      <h1>Landing Page</h1>
      <Link to="/dashboard">
        <button>Go to dashboard</button>
      </Link>
      <Link to="/login">
        <button>Go to login</button>
      </Link>
    </div>
  )
}

export default Landing