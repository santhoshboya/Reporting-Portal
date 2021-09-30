import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'

import {BiRupee} from 'react-icons/bi'

import Header from '../Header'

import Footer from '../FooterSection'

import FoodItemInfo from '../FoodItemDetails'

import {TopContainer, TopTextContainer} from './styledComponents'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantDetails: {},
    foodItems: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    console.log(id)
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    const updatedData = {
      id: fetchedData.id,
      rating: fetchedData.rating,
      cuisine: fetchedData.cuisine,
      itemsCount: fetchedData.items_count,
      imageUrl: fetchedData.image_url,
      location: fetchedData.location,
      opensAt: fetchedData.opens_at,
      reviewsCount: fetchedData.reviews_count,
      costForTwo: fetchedData.cost_for_two,
      name: fetchedData.name,
    }

    const updatedFoodItem = fetchedData.food_items.map(each => ({
      ItemId: each.id,
      foodImageUrl: each.image_url,
      ItemName: each.name,
      ItemRating: each.rating,
      cost: each.cost,
    }))

    if (response.ok === true) {
      this.setState({
        restaurantDetails: updatedData,
        foodItems: updatedFoodItem,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderAllRestaurants = () => {
    const {restaurantDetails, foodItems} = this.state
    const {
      rating,
      location,
      costForTwo,
      reviewsCount,
      imageUrl,
      cuisine,
      name,
    } = restaurantDetails

    return (
      <>
        <TopContainer>
          <img src={imageUrl} alt="restaurant" className="restaurant-image" />
          <TopTextContainer>
            <h1 className="restaurant-name">{name}</h1>
            <p className="cuisine">{cuisine}</p>
            <p className="location">{location}</p>
            <div className="rating-details-container">
              <div className="rating-item-container">
                <p className="rating-text">
                  <AiFillStar className="icon" /> {rating}
                </p>
                <p className="rating-desc">{reviewsCount} + Ratings</p>
              </div>
              <hr className="line" />
              <div className="rating-item-container">
                <p className="price">
                  <BiRupee />
                  {costForTwo}
                </p>
                <p className="rating-desc">Cost for two</p>
              </div>
            </div>
          </TopTextContainer>
        </TopContainer>
        <div className="food-items-cont">
          <ul className="food-items-list-container">
            {foodItems.map(each => (
              <FoodItemInfo key={each.id} details={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div
      className="products-loader-container"
      data-testid="restaurant-details-loader"
    >
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurants = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllRestaurants()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderRestaurants()}

        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
