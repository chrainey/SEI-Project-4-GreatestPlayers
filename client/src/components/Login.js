import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setId, setToken } from '../helpers/auth'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'




const Login = () => {

  const navigate = useNavigate() 
  const [ errors, setErrors ] = useState(false)
  const [ loginData, setLoginData ] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value  })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', loginData)
      setToken(data.token)
      setId(data.userId)
      navigate('/players/')

    } catch (error) {
      setErrors(error.response.data.messages)
      console.log(error.response.data.messages)
    }
  }
  

  return  (     
    <main className='form-login justify-content-center'>
      <Form onSubmit={onSubmit} className='login-form'>
        <h1>Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type='text' name='email' placeholder='Email' onChange={handleChange} value={loginData.email} />   
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' placeholder='Password' onChange={handleChange} value={loginData.password} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        {errors && <div className='error'>{errors}</div>}
      </Form>
    </main>    
  )
}

export default Login