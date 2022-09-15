import { useEffect } from 'react'

const Filters = ({ filters, setFilters, players, setFilteredPlayers }) => {

  
  const handleChange = (event) => {
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value,
    }
    setFilters(newObj)
  }

  useEffect(() => {

    const regexSearch = new RegExp(filters.search, 'i')
    const filteredArray = players.filter(player => {
      return regexSearch.test(players.name) && (player.nationality === filters.nationality || filters.nationality === 'All')
    })
    console.log(filteredArray)
    setFilteredPlayers(filteredArray)

  }, [filters, players])

  const clubs = [ ...new Set(players.map(player => player.nationality))]

  return (
    <div className="filters mb-4 mt-4 d-flex">
      {/* Club dropdown */}
      <select onChange={handleChange} name="nationality" value={filters.nationality}>
        <option value="All">All Nationalities</option>
        { clubs.map(nationality => <option key={nationality} value={nationality}>{nationality}</option>)}
      </select>
      <input onChange={handleChange} type="text" name="search" value={filters.search} placeholder="Search" />
    </div>
  )
}

export default Filters