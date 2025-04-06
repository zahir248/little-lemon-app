import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/avatar.png';

function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-content">
          <div className="hero-text">
            <h1 id="hero-heading">Little Lemon</h1>
            <h2>Chicago</h2>
            <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
            <Link to="/booking" className="button primary">Reserve a Table</Link>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="Delicious dish from Little Lemon" />
          </div>
        </div>
      </section>
      
      {/* Additional homepage sections would go here */}
    </main>
  );
}

export default HomePage;