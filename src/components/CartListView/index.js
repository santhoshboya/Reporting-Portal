import CartItem from '../CartItem'
import CartContext from '../../CartContext/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <ul className="cart-list">
          <div className="headers-container">
            <p className="headers-text">Items</p>
            <p className="headers-text">Quantity</p>
            <p className="headers-text">Price</p>
          </div>
          {cartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
