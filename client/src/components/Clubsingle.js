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
          
          <div className="kitchen-sink justify-content-center">
            <Card border="dark" className="club-card">
              <Card.Img className="club-card-image" variant="top" src={club.image_1} alt={club.name} />
              <Card.Body>
                <Card.Title>{club.name} - {club.country}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush ">
                <ListGroup.Item>Stadium: {club.stadium}</ListGroup.Item>
                <ListGroup.Item>Capacity: {club.stadium_capacity}</ListGroup.Item>
                <ListGroup.Item>Info: {club.info}</ListGroup.Item>
              </ListGroup>
              
            </Card>
            
            <Link to="/clubs" className='btn dark'>Back to all clubs</Link>
          </div>
          :
          <h2 className="text-center">
            { errors ? 'Something went wrong. Please try again later' : <Spinner />}
          </h2>
        }
    
      
      </Container>
    </div>





  )

}

export default Club