import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Spinner from './Spinner'
import Filters from '../helpers/Filters'
import Customcard from '../helpers/Customcard'

const AllPlayers = () => {

  const [ playerData, setPlayerData ] = useState([])
  const [ errors, setErrors ] = useState(false)

  const [ players, setPlayers ] = useState([])
  const [ filteredPlayers, setFilteredPlayers ] = useState([])
  const [ filters, setFilters ] = useState({
    nationality: 'All',
    position: 'All',
    search: '',
  })
  
  useEffect(() => {
    
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/players/')
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
            <div className="filters-container">
              {/* Filters */}
              <Filters filters={filters} setFilters={setFilters} players={players} setFilteredPlayers={setFilteredPlayers} />
              {/* PLayer list */}
            </div>
            <div className="row">
              {
                (filteredPlayers.length > 0 ? filteredPlayers : players).map(player => {
                  return <Customcard key={player.name} {...player} />
                })
              }
            </div>
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