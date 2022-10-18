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
      console.log(regexSearch.test(player.name))
      console.log((player.nationality === filters.nationality || filters.nationality === 'All'))
      console.log((player.position === filters.position || filters.position === 'All'))
      return regexSearch.test(player.name) && ( (player.nationality === filters.nationality || filters.nationality === 'All')
      &&  (player.position === filters.position || filters.position === 'All'))
    })
    console.log(filteredArray)
    setFilteredPlayers(filteredArray)

  }, [filters, players])

  const nations = [ ...new Set(players.map(player => player.nationality))]
  const positions = [ ...new Set(players.map(player => player.position))]


  return (
    <div className="filters mb-4 mt-4">
      {/* Club dropdown */}
      <select onChange={handleChange} name="nationality" value={filters.nationality}>
        <option value="All">All Nationalities</option>
        { nations.map(nationality => <option key={nationality} value={nationality}>{nationality}</option>)}
      </select>
      <select onChange={handleChange} name="position" value={filters.position}>
        <option value="All">All Positions</option>
        { positions.map(position => <option key={position} value={position}>{position}</option>)}
      </select>
      <input onChange={handleChange} type="text" name="search" value={filters.search} placeholder="Search" />
    </div>
  )
}

export default Filters