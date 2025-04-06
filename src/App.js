import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import ConfirmedBooking from './components/ConfirmedBooking';
import { BookingProvider } from './context/BookingContext';
import './App.css';

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;