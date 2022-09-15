/* eslint-disable camelcase */
const customCard = ({ name, image_1 }) => {
  return (
    <div className="col-6 col-md-4 mb-4">
      <div className="card text-center">
        <div className="card-header">
          <h4>{name.common}</h4>
        </div>
        <div className="card-image">
          <img className="w-100" src={image_1} alt={name} />
        </div>
        <div className="card-text">
          <h6>{name.nationality}</h6>
        </div>
      </div>
    </div>
  )
}

export default customCard