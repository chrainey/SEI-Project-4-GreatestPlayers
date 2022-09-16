import { Link } from 'react-router-dom'

const Landing = () => {
  
  const buttons = [
    {
      label: 'Register',
      path: '/register',
    },
    {
      label: 'Login',
      path: '/login',
    }
  ]

  return (
    <>
      <main className="hero text-center">
        <div className="hero-container">
          <h1 className='display-3'>Football Legends</h1>
          <Link to='/players/'>
            <button>Welcome to a collection of some of the best football players of all time</button>
          </Link>
          <p className='lead'>To add reviews on a player, please register below or login</p>
          {buttons.map((button, index) => (
            <Link key={index} to={button.path}>
              <button>{button.label}</button>
            </Link>
          ))}
          
        </div>
      </main>
    </>
  )
}


export default Landing