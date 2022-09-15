import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setId, setToken } from '../helpers/auth'




const Login = () => {

  const navigate = useNavigate() 
  const [ errors, setErrors ] = useState(false)
  const [ loginData, setLoginData ] = useState({
    userName: '',
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
      navigate(`/users/${data.userId}`)

    } catch (error) {
      setErrors(error.response.data.messages)
      console.log(error.response.data.messages)
    }
  }
  

  return  ( 
    <div className='form-login'>

      <h1>Login Page</h1>
      {errors && <div className='error'>{errors}</div>}

      <form onSubmit={onSubmit} className='form-wrapper'>
        <input type='text' name='email' placeholder='Email' onChange={handleChange} value={loginData.email} />
        <input type='password' name='password' placeholder='Password' onChange={handleChange} value={loginData.password} />
        <button type='submit'>Login</button>
      </form>

    </div>
  )
}

export default Login