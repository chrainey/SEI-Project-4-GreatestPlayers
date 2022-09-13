import axios from 'axios'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/players/')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
      
    }
    getData()
  }, [])
}

export default Dashboard