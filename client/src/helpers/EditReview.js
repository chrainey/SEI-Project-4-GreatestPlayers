import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getToken } from './auth'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'


const EditReview = () => {

  const navigate = useNavigate()
  const { playerId , reviewId } = useParams()
  const [ updatedReview, setUpdatedReview ] = useState('')
  const [ player, setPlayer ] = useState(null)

  const [ review, setReview ] = useState(
    {
      text: '',
      player: parseInt(playerId),
    }
  )
  
  const [ errors, setErrors ] = useState(false)

  

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/players/${playerId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setReview(data.review)
        setUpdatedReview(data)
        setPlayer(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getUser()
  }, [playerId])

  

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.put(`/api/reviews/${reviewId}/`, review, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      setReview({ text: '', player: '', owner: '' })
      navigate(`/players/${playerId}/`)
    } catch (error) {
      console.log(error)
      setErrors(error)
    }
  }

  const handleChange = (event) => {
    setReview({ ...review, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
    
  }

  return (
    <main className="add-review-page justify-content-center">
      <Form className="review-form" onSubmit={handleSubmit}>
        <h1>Edit review</h1>
        <Form.Group>
          <Form.Label htmlFor="text" >Review Text</Form.Label>          
          <Form.Control as="textarea" rows={4} name="text" placeholder="Type Review Here" value={updatedReview.text} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>  
      </Form>
    </main>
  )
}


export default EditReview