import CartItem from '../CartItem'
import CartContext from '../../CartContext/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const newCartList = localStorage.getItem('cartList')
      const parsedString = JSON.parse(newCartList)

      return (
        <ul className="cart-list">
          <div className="headers-container">
            <p className="headers-text">Items</p>
            <p className="headers-text quantity-text">Quantity</p>
            <p className="headers-text">Price</p>
          </div>
          <hr />
          {parsedString.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
