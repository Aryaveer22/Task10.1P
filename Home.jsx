import React from 'react';
import './Home.css';
import NewsletterSignup from './NewsletterSignup';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Newsletter Signup Page</h1>
      <NewsletterSignup />
    </div>
  );
};

export default Home;
