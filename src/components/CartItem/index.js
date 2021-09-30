import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../CartContext/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {
        ItemId,
        foodImageUrl,
        cost,
        quantity,
        ItemName,
        ItemRating,
      } = cartItemDetails
      const onClickDecrement = () => {
        decrementCartItemQuantity(ItemId)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(ItemId)
      }
      const onRemoveCartItem = () => {
        removeCartItem(ItemId)
      }
      const totalPrice = cost * quantity

      return (
        <li className="cart-item">
          <img
            className="cart-product-image"
            src={foodImageUrl}
            alt={ItemName}
          />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{ItemName}</p>
              <p className="cart-product-brand">Rating {ItemRating}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                testid="minus"
                onClick={onClickDecrement}
                data-testid="decrement-quantity"
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity" data-testid="item-quantity">
                {quantity}
              </p>
              <button
                type="button"
                className="quantity-controller-button"
                testid="plus"
                onClick={onClickIncrement}
                data-testid="increment-quantity"
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price" data-testid="total-price">
                <BiRupee /> {totalPrice}/-
              </p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
            testid="remove"
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
