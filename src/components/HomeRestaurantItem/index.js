import {Link} from 'react-router-dom'

import {StarIcon, IconItem} from './styledComponents'

import './index.css'

const RestaurantItem = props => {
  const {details} = props
  const {id, name, cuisine, imageUrl, userRating} = details
  const {rating, ratingColor} = userRating

  return (
    <Link to={`/restaurants-list/${id}`} className="link-styling">
      <li className="list-container" data-testid="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="res-image" />
        <div className="res-text-container">
          <h1 className="res-heading">{name}</h1>
          <p className="res-para">{cuisine}</p>
          <div className="rating-container">
            <StarIcon color={`${ratingColor}`}>
              <IconItem color={ratingColor} />
            </StarIcon>
            <p className="res-para">{rating}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
