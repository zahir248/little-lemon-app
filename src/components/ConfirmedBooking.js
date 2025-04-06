import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BookingContext } from "../context/BookingContext";

function ConfirmedBooking() {
  const { lastBooking } = useContext(BookingContext);

  return (
    <main className="confirmed-booking">
      <section className="confirmation-section">
        <div className="container">
          <h1>Reservation Confirmed!</h1>

          {lastBooking ? (
            <div className="confirmation-details">
              <p>Thank you for your reservation, {lastBooking.firstName}!</p>
              <p>
                We look forward to seeing you at Little Lemon on{" "}
                <strong>
                  {new Date(lastBooking.date).toLocaleDateString()}
                </strong>{" "}
                at <strong>{lastBooking.time}</strong>.
              </p>

              <div className="booking-summary">
                <h2>Booking Summary</h2>
                <ul>
                  <li>
                    <strong>Date:</strong>{" "}
                    {new Date(lastBooking.date).toLocaleDateString()}
                  </li>
                  <li>
                    <strong>Time:</strong> {lastBooking.time}
                  </li>
                  <li>
                    <strong>Party Size:</strong> {lastBooking.guests} guests
                  </li>
                  <li>
                    <strong>Occasion:</strong> {lastBooking.occasion}
                  </li>
                  <li>
                    <strong>Reservation Number:</strong>{" "}
                    {Math.floor(Math.random() * 1000000)
                      .toString()
                      .padStart(6, "0")}
                  </li>
                </ul>
              </div>

              <p>
                A confirmation email has been sent to{" "}
                <strong>{lastBooking.email}</strong>.
              </p>
              <p>
                If you need to make any changes to your reservation, please call
                us at (312) 555-1234.
              </p>
            </div>
          ) : (
            <p>
              No reservation information available. Please try booking again.
            </p>
          )}

          <div className="confirmation-actions">
            <Link to="/" className="button secondary">
              Return to Home
            </Link>
            <Link to="/menu" className="button primary">
              View Our Menu
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ConfirmedBooking;
