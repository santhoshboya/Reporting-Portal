import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {MdSort} from 'react-icons/md'
import {IoMdArrowDropleftCircle, IoMdArrowDroprightCircle} from 'react-icons/io'

import RestaurantItem from '../HomeRestaurantItem'

import Footer from '../FooterSection'

import Header from '../Header'
import './index.css'

import {
  HomeContainer,
  CarouselContainer,
  PopularContainer,
  PopularContainerTwo,
  PopularHeading,
  PopularDescription,
  SortContainer,
  SortItem,
  SortOption,
  ProductsLoaderContainer,
  RestaurantsList,
  ButtonItem,
  ButtonsContainer,
  PageCount,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    offers: [],
    apiStatus: apiStatusConstants.initial,
    activePage: 1,
    restaurants: [],
    sortOption: 'Highest',
  }

  componentDidMount() {
    this.getOffers()
    this.getRestaurants()
  }

  getOffers = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/offers`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const offersData = await response.json()
    const setData = offersData.offers.map(each => ({
      imageUrl: each.image_url,
      id: each.id,
    }))

    if (response.ok === true) {
      this.setState({
        offers: setData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getRestaurants = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {activePage, sortOption} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortOption}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const updatedData = fetchedData.restaurants.map(each => ({
      id: each.id,
      costForTwo: each.cost_for_two,
      cuisine: each.cuisine,
      groupByTime: each.group_by_time,
      hasOnlineDelivery: each.has_online_delivery,
      hasTableBooking: each.has_table_booking,
      imageUrl: each.image_url,
      isDeliveringNow: each.is_delivering_now,
      location: each.location,
      name: each.name,
      menuType: each.menu_type,
      opensAt: each.opens_at,
      userRating: {
        rating: each.user_rating.rating,
        ratingColor: each.user_rating.rating_color,
        ratingText: each.user_rating.rating_text,
        totalReviews: each.user_rating.total_reviews,
      },
    }))
    if (response.ok === true) {
      this.setState({
        restaurants: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onDecrementPage = () => {
    const {activePage} = this.state

    if (activePage > 1) {
      this.setState(
        prev => ({activePage: prev.activePage - 1}),
        this.getRestaurants,
      )
    }
  }

  onIncrementPage = () => {
    const {activePage} = this.state

    if (activePage < 15) {
      this.setState(
        prev => ({activePage: prev.activePage + 1}),
        this.getRestaurants,
      )
    }
  }

  renderHomeItems = () => {
    const {offers, restaurants, activePage, sortOption} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: 'linear',
    }

    return (
      <>
        <CarouselContainer>
          <Slider {...settings} height="30%" width="60%">
            {offers.map(each => (
              <div className="carousel-container">
                <img
                  src={each.imageUrl}
                  alt="offer"
                  className="carousel-image"
                />
              </div>
            ))}
          </Slider>
        </CarouselContainer>
        <PopularContainer>
          <PopularContainerTwo>
            <div>
              <PopularHeading>Popular Restaurants</PopularHeading>
              <PopularDescription>
                Select Your favourite restaurant special dish and make your day
                happy...
              </PopularDescription>
            </div>
            <SortContainer>
              <MdSort className="icon-style" />
              <PopularDescription>Sort by </PopularDescription>
              <SortItem onChange={this.onChangeSortOption} value={sortOption}>
                <SortOption key="1" value="Highest">
                  Highest
                </SortOption>
                <SortOption key="2" value="Lowest">
                  Lowest
                </SortOption>
              </SortItem>
            </SortContainer>
          </PopularContainerTwo>

          <RestaurantsList>
            {restaurants.map(each => (
              <RestaurantItem key={each.id} details={each} />
            ))}
          </RestaurantsList>
          <ButtonsContainer>
            <ButtonItem
              onClick={this.onDecrementPage}
              data-testid="pagination-left-button"
            >
              <IoMdArrowDropleftCircle />
            </ButtonItem>
            <PageCount data-testid="active-page-number">
              {activePage} of ... 20
            </PageCount>
            <ButtonItem
              onClick={this.onIncrementPage}
              data-testid="pagination-right-button"
            >
              <IoMdArrowDroprightCircle />
            </ButtonItem>
          </ButtonsContainer>
        </PopularContainer>
      </>
    )
  }

  renderLoadingView = () => (
    <ProductsLoaderContainer
      className="products-loader-container"
      data-testid="restaurants-offers-loader"
    >
      <Loader type="TailSpin" color="#F7931E" height="80" width="80" />
    </ProductsLoaderContainer>
  )

  renderAllItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeItems()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  onChangeSortOption = event => {
    this.setState({sortOption: event.target.value}, this.getRestaurants)
    console.log(event.target.value)
  }

  render() {
    return (
      <HomeContainer>
        <Header />
        {this.renderAllItems()}
        <Footer />
      </HomeContainer>
    )
  }
}

export default Home
