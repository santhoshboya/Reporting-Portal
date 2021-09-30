import {Component} from 'react'

import {
  AiFillStar,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from 'react-icons/ai'

import {BiRupee} from 'react-icons/bi'

import CartContext from '../../CartContext/CartContext'

import './index.css'

class FoodItemInfo extends Component {
  state = {quantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {quantity} = this.state
          const {details} = this.props
          const {addCartItem} = value
          const onClickAddToCart = () => {
            this.setState(
              prev => ({quantity: prev.quantity + 1}),
              addCartItem({...details, quantity: 1}),
            )
          }

          const onClickMinus = () => {
            if (quantity > 0) {
              this.setState(
                prev => ({quantity: prev.quantity - 1}),
                addCartItem({...details, quantity}),
              )
            }
          }

          const onClickPlus = () => {
            this.setState(
              prev => ({quantity: prev.quantity + 1}),
              addCartItem({...details, quantity}),
            )
          }

          const {ItemName, cost, foodImageUrl, ItemRating} = details
          const ButtonItem =
            quantity === 0 ? (
              <button
                type="button"
                className="add-button"
                onClick={onClickAddToCart}
              >
                ADD
              </button>
            ) : (
              <div className="item-count-container">
                <button
                  type="button"
                  className="plus-button"
                  onClick={onClickMinus}
                  data-testid="decrement-count"
                >
                  <AiOutlineMinusSquare className="icon-item" />
                </button>
                <p className="item-count-text" data-testid="active-count">
                  {quantity}
                </p>
                <button
                  type="button"
                  className="plus-button"
                  onClick={onClickPlus}
                  data-testid="increment-count"
                >
                  <AiOutlinePlusSquare className="icon-item" />
                </button>
              </div>
            )

          return (
            <li className="food-item-container" data-testid="foodItem">
              <div className="food-image-container">
                <img
                  src={foodImageUrl}
                  alt={ItemName}
                  className="food-item-image"
                />
              </div>
              <div className="food-text-container">
                <h1 className="food-name">{ItemName}</h1>
                <p className="cost-text">
                  <BiRupee className="cost-icon" /> {cost}.00
                </p>
                <p className="rating-text-food">
                  <AiFillStar className="rating-icon" />
                  {ItemRating}
                </p>
                <div>{ButtonItem}</div>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default FoodItemInfo
