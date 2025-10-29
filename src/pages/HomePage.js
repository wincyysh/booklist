import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="card">
      <h1>Welcome to Books Recommendation</h1>
      <div className="card-body">
        <Link to="/search">
          <h5 className="card-title"> Advanced Search</h5>
          <p className="card-text">
            Search by title, author, ISBN, subject, or publisher
          </p>
        </Link>
      </div>

      <div className="card-body">
        <Link to="/reading-list">        
          <h5 className="card-title"> Reading List</h5>
          <p className="card-text">
            Save and organize your favorite books
          </p>
        </Link>
      </div>

      <div className="card-body">
        <Link to="/bestsellers">
          <h5 className="card-title"> Bestsellers</h5>
          <p className="card-text">
            Explore trending and popular books
          </p>
        </Link>
      </div>

      <div className="card-body">
        <Link to="/about" className="card-text">
          <h5 className="card-title"> About</h5>
          <p className="card-text">
            Learn more about this platform
          </p>
        </Link>
      </div>

    </div>

  );
};

export default HomePage;