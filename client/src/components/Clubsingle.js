import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Spinner from './Spinner.js'
import Card  from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

const Club = () => {
  const navigate = useNavigate()
  const { clubId } = useParams()
  const [ club, setclub ] = useState([])
  
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/clubs/${ clubId }/`)
        setclub(data)
        
        console.log(data)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
    
  }, [clubId])

  return (
    <div className='club-page'>
      <Container as="main">
        { club ? 
          
          <div className="kitchen-sink">
            <h1>{club.name}</h1>
            <Card border="dark" className="club-card bg-transparent">
              <Card.Img variant="top" src={club.image_1} alt={club.name} />
              <Card.Body className="bg-transparent">
                <Card.Title>{club.name} - {club.country}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush ">
                <ListGroup.Item>Stadium: {club.stadium}</ListGroup.Item>
                <ListGroup.Item>Capacity: {club.stadium_capacity}</ListGroup.Item>
                <ListGroup.Item>Info: {club.info}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
            {/* <Container as='section' className='text-center'>
              <h3>reviews</h3>
              { club.reviews.length > 0
                ?
                club.reviews.map(review => {
                  const { _id: reviewId, reviewText, rating } = review
                  const activities = review.activities.join(', ')
                  return (                       
                    <Link to={`/travel/${review.clubId}`}>
                      <Card key={reviewId} className="re-card">
                        <Card.Img variant='top' src={review.reviewImgUrl[0] ? review.reviewImgUrl[0] : 'https://sei65-clubs.s3.eu-west-1.amazonaws.com/users/default-image.jpg' }></Card.Img>
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
            <Link to="/clubs" className='btn dark'>Back to all clubs</Link>
          </div>
          :
          <h2 className="text-center">
            { errors ? 'Something went wrong. Please try again later' : <Spinner />}
          </h2>
        }
    
        <Link to={`/review/${clubId}`}>
          <button>Add a review</button>
        </Link>
      
      </Container>
    </div>





  )

}

export default Club