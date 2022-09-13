import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Spinner from './Spinner.js'
import  Card  from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

const Player = () => {
  const navigate = useNavigate()
  const { playerId } = useParams()
  const [ player, setPlayer ] = useState([])
  
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/players/${ playerId }/`)
        setPlayer(data)
        
        console.log(data)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
    
  }, [playerId])

  return (
    <div className='player-page'>
      <Container as="main">
        { player ? 
          
          <div className="kitchen-sink">
            <h1>{player.name}</h1>
            <Card border="dark" className="player-card bg-transparent">
              <Card.Img  variant="top" src={player.image} alt={player.name} />
              <Card.Body className="bg-transparent">
                <Card.Title>{player.name} - {player.position}</Card.Title>
                <Card.Text>
                  {player.description}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush ">
                <ListGroup.Item>Clubs:</ListGroup.Item>
                <ListGroup.Item>Shirt Number: {player.shirt_number}</ListGroup.Item>
                <ListGroup.Item>Position: {player.position}</ListGroup.Item>
                <ListGroup.Item>Goals: {player.goals}</ListGroup.Item>
                <ListGroup.Item>Nationality: {player.position}</ListGroup.Item>
                <ListGroup.Item>International Caps: {player.international_caps}</ListGroup.Item>
                <ListGroup.Item>Info: {player.info}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
            {/* <Container as='section' className='text-center'>
              <h3>reviews</h3>
              { player.reviews.length > 0
                ?
                player.reviews.map(review => {
                  const { _id: reviewId, reviewText, rating } = review
                  const activities = review.activities.join(', ')
                  return (                       
                    <Link to={`/travel/${review.playerId}`}>
                      <Card key={reviewId} className="re-card">
                        <Card.Img variant='top' src={review.reviewImgUrl[0] ? review.reviewImgUrl[0] : 'https://sei65-players.s3.eu-west-1.amazonaws.com/users/default-image.jpg' }></Card.Img>
                        <Card.Body>
                          <Card.Title className='text-center mb-0'>{review.name}</Card.Title>        
                          <Card.Text>
                            {reviewText}
                          </Card.Text>  
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item><span>👤</span> {review.createdBy}</ListGroup.Item>
                            <ListGroup.Item>Rating: {rating}</ListGroup.Item>
                            <ListGroup.Item>Activites: {activities}</ListGroup.Item>
                          </ListGroup>                    
                        
                          <div className="buttons mb-4">
                            <Button variant="danger" onClick={deleteReview}>Delete Review</Button>
                            <Link to={'/landing'} className='btn btn-primary'>Edit Review</Link>
                          </div>                          
                        </Card.Body>
                      </Card>
                    </Link>             
                  )
                })
                :
                <>
                  { errors ? <h2>Something went wrong. Please try again later</h2> : <p>Add your first review</p>}
                </>
              }
            </Container>             */}
            <Link to="/travel" className='btn dark'>Back to all player</Link>
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