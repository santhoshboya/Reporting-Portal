import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../CartContext/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })

      const onClickPlaceOrder = () => {
        removeAllCartItems()
      }

      return (
        <>
          <div className="cart-summary-container">
            <div>
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span>
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>
            </div>
            <div>
              <h1 className="order-total-value">
                <BiRupee /> {total}
                /-
              </h1>
              <Link to="/payment-success" className="link-item">
                <button
                  type="button"
                  className="checkout-button d-sm-none"
                  onClick={onClickPlaceOrder}
                >
                  Place Order
                </button>
              </Link>
              <Link to="/payment-success" className="link-item">
                <button
                  type="button"
                  className="checkout-button d-lg-none"
                  onClick={onClickPlaceOrder}
                >
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
