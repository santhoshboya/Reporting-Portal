import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div>
    <Header />

    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dqnh9af86/image/upload/v1633005766/erroring_1_kjjqjq.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-head">Page Not Found</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found
        <br />
        Please go back to the homepage
      </p>
      <Link to="/" className="not-found-link">
        <button type="button" className="not-found-home-button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
