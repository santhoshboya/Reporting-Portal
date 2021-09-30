import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const PaymentSuccessful = () => (
  <div>
    <Header />
    <div className="payment-main-container">
      <div className="payment-success-container">
        <img
          src="https://res.cloudinary.com/dqnh9af86/image/upload/v1633003836/Vector_2_z12wqg.png"
          alt="success"
        />
        <h1 className="payment-head">Payment Successful</h1>
        <p className="payment-para">
          Thank you for ordering
          <br />
          Your payment is successfully completed.
        </p>
        <Link to="/" className="link-item">
          <button type="button" className="go-to-home-button">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default PaymentSuccessful
