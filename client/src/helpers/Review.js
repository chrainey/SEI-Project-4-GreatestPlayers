import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getToken } from './auth'


const Review = () => {

  const navigate = useNavigate()
  const { playerId } = useParams()

  const [ review, setReview ] = useState(
    {
      text: '',
      playerId: '',
      playerName: '',
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
      const { data } = await axios.post(`/api/reviews/${playerId}/`, review, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      setReview(data)
      navigate(`/api/reviews/${playerId}`)
    } catch (error) {
      console.log(error)
      setErrors(error)
    }
  }

  return (
    <main>
      <form className="review-form" onSubmit={handleSubmit}>
        <h1>Add review</h1>
        <label htmlFor="reviewText">Review Text</label>
        <textarea name="reviewText" placeholder="Review text" value={review.reviewText} onChange={handleChange} ></textarea>
        <input type="submit"/> 
      </form>
    </main>
  )
}


export default Review