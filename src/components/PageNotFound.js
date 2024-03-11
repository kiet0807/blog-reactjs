import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="text-center">
      <img
        src={'../assets/images/page-not-found.jpg'}
        alt="../assets/images/page-not-found.jpg"
      />
      <Link className="mt-2 d-block" to="/">
        <i className="fas fa-arrow-left me-1">
          <span color="black">Return to Dashboard</span>
        </i>
      </Link>
    </div>
  );
};

export default PageNotFound;
