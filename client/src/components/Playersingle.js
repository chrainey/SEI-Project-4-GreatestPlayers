import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Spinner from './Spinner.js'
import Card  from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/button'
import { getToken, userIsOwner } from '../helpers/auth'



const Player = () => {
  const navigate = useNavigate()
  const { playerId } = useParams()
  const [ player, setPlayer ] = useState([])
  const [ reviews, setReviews] = useState([])
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/players/${ playerId }/`)
        setPlayer(data)
        setReviews(data.reviews)
        console.log(data)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
    
  }, [playerId])

  const deleteReview = async (event) => {
    
    event.preventDefault()
    try {
      const { data } = await axios.delete(`/api/reviews/${event.target.name}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        
      })
      console.log(getToken())
      setReviews(data.review[0].id)
      
      navigate(`/players/${ playerId }`)
    } catch (err) {
      console.log(err) 
    }
  }

  return (
    <div className='player-page'>
      <Container as="main">
        { player ? 
          
          <div className="kitchen-sink">
            <Card border="dark" className="player-card">
              <Card.Img className='w-100' variant="top" src={player.image_1} alt={player.name} />
              <Card.Body className="bg-transparent">
                <Card.Title>{player.name} - {player.position}</Card.Title>

              </Card.Body>
              <ListGroup className="list-group-flush ">
                <ListGroup.Item>Clubs:</ListGroup.Item>
                {player.clubs && player.clubs.length && player.clubs.map((club) => (
                  <ListGroup.Item key={club.name}>{club.name}</ListGroup.Item>
                  
                ))}  
                <ListGroup.Item>Shirt Number: {player.shirt_number}</ListGroup.Item>
                <ListGroup.Item>Position: {player.position}</ListGroup.Item>
                <ListGroup.Item>Goals: {player.goals}</ListGroup.Item>
                <ListGroup.Item>Nationality: {player.nationality}</ListGroup.Item>
                <ListGroup.Item>International Caps: {player.international_caps}</ListGroup.Item>
                <ListGroup.Item>Info: {player.info}</ListGroup.Item>
              </ListGroup>

            </Card>
            <Container className="review-container text-center">
              <h3>Reviews</h3>
              { reviews.length > 0
                ?
                reviews.map(review => {
                  //const { id, text } = review
                  console.log(review)
                  
                  return (                       
                    // <Link key={review.id} to={`/api/players/${review.playerId}`}>
                    <Card key={review.id} className="re-card">
                      <Card.Body>
                        <Card.Title className='text-center mb-0'>{review.name}</Card.Title>        
                        <Card.Text>
                          {review.text}
                        </Card.Text>
                      </Card.Body>
                      { userIsOwner(review) && 
                        <div className="buttons mb-4">
                          <Button variant="danger" name = {review.id} onClick={deleteReview}>Delete Review</Button>
                          {/* <Link to={'/players'} className='btn btn-primary'>Edit Review</Link> */}
                        </div> 
                      }                         
                    </Card>
                    // </Link>             
                  )
                })
                :
                <>
                  { errors ? <h2>Something went wrong. Please try again later</h2> : <p>Add your first review</p>}
                </>
              }
            </Container>             
            <Link to="/players/">
              <button>Back to all players</button>
            </Link>
          </div>
          :
          <h2 className="text-center">
            { errors ? 'Something went wrong. Please try again later' : <Spinner />}
          </h2>
        }
    
        <Link to={`/review/${playerId}`}>
          <button>Add a review</button>
        </Link>

      
      </Container>
    </div>





  )

}

export default Player