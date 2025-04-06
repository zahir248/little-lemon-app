import React from 'react';
import BookingForm from './BookingForm';

function BookingPage() {
  return (
    <main className="booking-page">
      <section className="reservation-section">
        <div className="container">
          <h1>Reserve a Table</h1>
          <p>Please fill out the form below to book your visit to Little Lemon. We look forward to serving you!</p>
          <BookingForm />
        </div>
      </section>
    </main>
  );
}

export default BookingPage;