/* eslint-disable camelcase */
import { Link } from 'react-router-dom' 


const Customcard = ({ name, image_1, nationality, position, id }) => {
  
  return (
    <div className="col-6 col-md-4 mb-4">
      <div className="card text-center">
        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/players/${id}/`}>
          <div className="card-header">
            <h3>{name}</h3>
          </div>
          <div className="card-image-container">
            <img className="player-image" src={image_1} alt={name} />
          </div>
          <div className="card-text">
            <h4>{nationality} - {position}</h4>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Customcard