import { Link } from 'react-router-dom';
import'./NotFound.css'

const NotFound = () => {
  return (
    <div> 
      <p className="zoom-area pt-[200px]">
        <b>CSS</b> animations to make a cool 404 page.{" "}
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container ">
        <Link          
          to="/"
          class="more-link"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;