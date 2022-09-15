import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Spinner from './Spinner.js'
import Card  from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/button'

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
              <Card.Img className='w-100' variant="top" src={player.image_1} alt={player.name} />
              <Card.Body className="bg-transparent">
                <Card.Title>{player.name} - {player.position}</Card.Title>

              </Card.Body>
              <ListGroup className="list-group-flush ">
                <ListGroup.Item>Clubs:</ListGroup.Item>
                {player.clubs && player.clubs.length && player.clubs.map((club) => (
                  <p key={club.name}>{club.name}</p>
                  
                ))}  
                <ListGroup.Item>Shirt Number: {player.shirt_number}</ListGroup.Item>
                <ListGroup.Item>Position: {player.position}</ListGroup.Item>
                <ListGroup.Item>Goals: {player.goals}</ListGroup.Item>
                <ListGroup.Item>Nationality: {player.position}</ListGroup.Item>
                <ListGroup.Item>International Caps: {player.international_caps}</ListGroup.Item>
                <ListGroup.Item>Info: {player.info}</ListGroup.Item>
              </ListGroup>

            </Card>
            <Container as='section' className='text-center'>
              <h3>reviews</h3>
              { player.reviews > 0
                ?
                player.reviews.map(review => {
                  const { id: reviewId, reviewText } = review
                  console.log(review)
                  
                  return (                       
                    <Link key={reviewId} to={`/api/players/${review.playerId}`}>
                      <Card key={reviewId} className="re-card">
                        <Card.Body>
                          <Card.Title className='text-center mb-0'>{review.name}</Card.Title>        
                          <Card.Text>
                            {reviewText}
                          </Card.Text>  
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item><span>👤</span> {review.createdBy}</ListGroup.Item>
                          </ListGroup>                    
                        
                          <div className="buttons mb-4">
                            {/* Will have buttons for delete review and edit review in here */}
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
    
        <Link to={`/reviews/${playerId}`}>
          <button>Add a review</button>
        </Link>

      
      </Container>
    </div>





  )

}

export default Player