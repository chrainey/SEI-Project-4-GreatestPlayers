import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'

const AllClubs = () => {

  const [ clubData, setClubData ] = useState([])
  const [ errors, setErrors ] = useState(false)
  
  useEffect(() => {
    
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/clubs/')
        setClubData(data)
      } catch (error) {
        console.log(error)
      }
    } 
    getData()
  }, [])

  
  return (
    <>
      { clubData[0] ?
        <div className='all-clubs-page'>
          <Container as="main" className='club-index'>
            <h1 className='text-center mb-4'>Football Clubs </h1>
            <Row className='club-row'>
              { clubData.map(item => {
                console.log(item)
                const { id } = item
                console.log(id)
                return (
                  <Col key={id} md="5" lg="4" className='mb-4'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/clubs/${id}/`}>
                      <Card>
                        <Card.Img className='club-image' variant='top' src={item.image_1}></Card.Img>
                        <Card.Body className='bg-light'>
                          <Card.Title className='multi-card text-center mb-0 text-decoration-none'>{item.name} - {item.country}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                )
              })
              }
            </Row>
          </Container>
        </div>
        :
        <h2 className="text-center">
          { errors ? 'Something went wrong. Please try again later' : <Spinner />}
        </h2>
      }
    </>
  )

}

export default AllClubs