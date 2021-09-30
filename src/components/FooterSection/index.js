import {
  FaTwitter,
  FaPinterestSquare,
  FaInstagram,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="logo-container">
      <img
        src="https://res.cloudinary.com/dqnh9af86/image/upload/v1632750203/Vector_1_byoodd.png"
        alt="website-footer-logo"
        className="logo-image"
      />
      <h1>Tasty Kitchens</h1>
    </div>
    <p className="para">
      The only thing we are serious about is food. Contact us on
    </p>
    <div>
      <FaPinterestSquare
        className="icon-logo"
        data-testid="pintrest-social-icon"
      />
      <FaInstagram className="icon-logo" data-testid="Instagram-social-icon" />
      <FaTwitter className="icon-logo" data-testid="twitter-social-icon" />
      <FaFacebookSquare
        className="icon-logo"
        data-testid="facebook-social-icon"
      />
    </div>
  </div>
)

export default Footer
