import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getToken } from './auth'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'


const Review = () => {

  const navigate = useNavigate()
  const { playerId } = useParams()
  

  const [ review, setReview ] = useState(
    {
      text: '',
      player: parseInt(playerId),
    }
  )
  
  const [ errors, setErrors ] = useState(false)

  const handleChange = async (event) => {
    setReview({ ...review, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/reviews/', review, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      setReview(data)
      navigate(`/players/${playerId}`)
    } catch (error) {
      console.log(error)
      setErrors(error)
    }
  }

  return (
    <main className="add-review-page justify-content-center">
      <Form className="review-form" onSubmit={handleSubmit}>
        <h1>Add review</h1>
        <Form.Group>
          <Form.Label htmlFor="text" >Review Text</Form.Label>          
          <Form.Control as="textarea" rows={4} name="text" placeholder="Type Review Here" value={review.text} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>  
      </Form>
    </main>
  )
}


export default Review