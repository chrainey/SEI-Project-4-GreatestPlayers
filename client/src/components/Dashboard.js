import axios from 'axios'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('/api/players/')
        setData(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
      
    }
    getData()
  }, [])

  return (
    <div className="view">
      <h1>Dashboard</h1>
      {data.map((player) => (
        <p key={player}>{player.name}</p>
        
      ))}
    
    </div>
  )
}

export default Dashboard