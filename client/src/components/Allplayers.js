import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
import Filters from './Filters'

const AllPlayers = () => {

  const [ playerData, setPlayerData ] = useState([])
  const [ errors, setErrors ] = useState(false)

  const [ players, setPlayers ] = useState([])
  const [ filteredPlayers, setFilteredPlayers ] = useState([])
  const [ filters, setFilters ] = useState({
    nationality: 'All',
    search: '',
  })
  
  useEffect(() => {
    
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/players')
        setPlayerData(data)
      } catch (error) {
        console.log(error)
      }
    } 
    getData()
  }, [])

  useEffect(() => {

    const getData = async () => {
      const { data } = await axios('/api/players/')
      setPlayers(data)
    }
    getData()
  }, [])
  
  return (
    <>
      { playerData[0] ?
        <div className='all-player-page'>
          <Container as="main" className='player-index'>
            <h1 className='text-center mb-4'>Football Legends</h1>
            <div className='filter-container'>
              <Filters filters={filters} setFilters={setFilters} players={players} setFilteredPlayers={setFilteredPlayers} />
            </div>
            <Row className="filter-nation">
              {
                filteredPlayers.map(item => {
                  const { id } = item
                  return <Card key={id} {...item} />
                })
              }
            </Row>
            <Row className='player-row'>
              { playerData.map(item => {
                const { id } = item
                return (
                  <Col key={id} md="5" lg="4" className='mb-4'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/players/${id}/`}>
                      <Card>
                        <Card.Img className='w-100' variant='top' src={item.image_1}></Card.Img>
                        <Card.Body className='bg-light'>
                          <Card.Title className='text-center mb-0 text-decoration-none'>{item.name} - {item.country}</Card.Title>
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

export default AllPlayers