import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { userIsAuthenticated, getId } from '../helpers/auth'

const NavBar = () => {
  const navigate = useNavigate()

  const userId = getId()

  const handleLogOut = () => {
    window.localStorage.removeItem('local-user-Token')
    window.localStorage.removeItem('local-user-Id')
    navigate('/login')
  }



  return (
    
    <Navbar expand="sm">
      <Container as="section">
        <Navbar.Brand as={Link} to="/">🌍</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav.Link as={Link} to='/' >Home</Nav.Link>        
          <Nav.Link as={Link} to='/players'>Players</Nav.Link>
          <Nav.Link as={Link} to='/clubs'>Clubs</Nav.Link>
          <Nav.Link as={Link} to='/images'>Images</Nav.Link>
          { userIsAuthenticated()
            ?
            <>
              <Nav.Link as={Link} to={`/users/${userId}`} >User Profile</Nav.Link>
              <span onClick={handleLogOut}>Logout</span>
            </>
            :
            <>
              <Nav.Link as={Link} to='/register'>Register</Nav.Link>
              <Nav.Link as={Link} to='/login'>Login</Nav.Link>
            </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>  
  )
}

export default NavBar


{/* <Navbar expand="sm">
      <Container as="section">
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav.Link as={Link} to='/' >Home</Nav.Link>        
          <Nav.Link as={Link} to='/players'>Players</Nav.Link>
          <Nav.Link as={Link} to='/images'>Images</Nav.Link>
          <Nav.Link as={Link} to='/clubs'>Clubs</Nav.Link>
          <Nav.Link as={Link} to='/register'>Register</Nav.Link>
          <Nav.Link as={Link} to='/login'>Login</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}