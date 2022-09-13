import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from 'react-router-dom'




const NavBar = () => {
  return (
    <Navbar expand="sm">
      <Container as="section">
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav.Link as={Link} to='/' >Home</Nav.Link>        
          <Nav.Link as={Link} to=''>Players</Nav.Link>
          <Nav.Link as={Link} to=''>Clubs</Nav.Link>
          <Nav.Link as={Link} to=''>Register</Nav.Link>
          <Nav.Link as={Link} to=''>Login</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
  )
}

export default NavBar