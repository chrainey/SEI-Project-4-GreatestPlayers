import axios from 'axios'
import { useState } from 'react'
import  Container from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { setId, setToken } from '../helpers/auth'

const Register = () => {
  const navigate = useNavigate()
  const [ formData, setFormData ] = useState({
    email: '',
    username: '',
    profile_image: '',
    password: '',
    password_confirmation: '',
  })
  const [ loginData, setLoginData ] = useState({
    userName: '',
    password: '',
  })
  const [ errors, setErrors ] = useState('')
  
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    if (event.target.name === 'username' || event.target.name === 'password') {
      setLoginData({ ...loginData, [event.target.name]: event.target.value })
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/register/', formData)
      console.log(data)
      autoLogin()
    } catch (error) {
      console.log(error)
    }
  }

  const autoLogin = async (event) => {
    try {
      const { data } = await axios.post('/api/auth/login/', loginData)
      setToken(data.token)
      setId(data.userId)
      navigate('/players/')
    } catch (error) {
      // setErrors(error.response.data.messages)
      console.log(error)
    }
  }


  return (
    <main className='form-page'>
      <Container className='register-form' as='main'>
        <Row>
          <h1>Register</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
              <Form.Label>User Name</Form.Label>
              <Form.Control onChange={handleChange} type="text" name="username" placeholder="Username" value={formData.username} /> 
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control  onChange={handleChange} type="email" name="email" placeholder='Email' value={formData.email}  />
              <Form.Text className="text-muted">
                We will never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={handleChange} type="password" name="password" placeholder='Password' value={formData.password}  />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control onChange={handleChange} type="password" name="password_confirmation" placeholder='Confirm Password' value={formData.password_confirmation} /> 
            </Form.Group>

            { errors && <p className='text-danger'>{errors}</p>}

            <Button variant="primary" type="submit">
            Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </main>

  )
}

export default Register 