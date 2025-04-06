import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../context/BookingContext";
import { validateForm } from "../utils/validateForm";

function BookingForm() {
  const { availableTimes, dispatch, submitReservation } =
    useContext(BookingContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 1,
    occasion: "Birthday",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (formData.date) {
      dispatch({ type: "UPDATE_TIMES", date: formData.date });
    }
  }, [formData.date, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate field on change if it's been touched
    if (touched[name]) {
      const fieldErrors = validateForm({
        ...formData,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: fieldErrors[name],
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    // Validate field on blur
    const fieldErrors = validateForm(formData);
    setErrors({
      ...errors,
      [name]: fieldErrors[name],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const formErrors = validateForm(formData);
    setErrors(formErrors);

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // If there are no errors, submit the form
    if (Object.values(formErrors).every((error) => !error)) {
      const success = submitReservation(formData);
      if (success) {
        navigate("/booking-confirmed");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="booking-form"
      aria-labelledby="booking-form-heading"
      noValidate
    >
      <h2 id="booking-form-heading" className="form-heading">
        Reservation Details
      </h2>

      <div className="form-group">
        <label htmlFor="date">Date*</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={errors.date ? "true" : "false"}
          aria-describedby={errors.date ? "dateError" : undefined}
          min={new Date().toISOString().split("T")[0]}
        />
        {errors.date && (
          <div id="dateError" className="error-message" role="alert">
            {errors.date}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="time">Time*</label>
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={errors.time ? "true" : "false"}
          aria-describedby={errors.time ? "timeError" : undefined}
          disabled={!formData.date}
        >
          <option value="">Select a time</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        {errors.time && (
          <div id="timeError" className="error-message" role="alert">
            {errors.time}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="guests">Number of guests*</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          value={formData.guests}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={errors.guests ? "true" : "false"}
          aria-describedby={errors.guests ? "guestsError" : undefined}
        />
        {errors.guests && (
          <div id="guestsError" className="error-message" role="alert">
            {errors.guests}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleInputChange}
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Business">Business</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <h2 className="form-heading">Contact Information</h2>

      <div className="form-group">
        <label htmlFor="firstName">First Name*</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={errors.firstName ? "true" : "false"}
          aria-describedby={errors.firstName ? "firstNameError" : undefined}
        />
        {errors.firstName && (
          <div id="firstNameError" className="error-message" role="alert">
            {errors.firstName}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name*</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={errors.lastName ? "true" : "false"}
          aria-describedby={errors.lastName ? "lastNameError" : undefined}
        />
        {errors.lastName && (
          <div id="lastNameError" className="error-message" role="alert">
            {errors.lastName}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "emailError" : undefined}
        />
        {errors.email && (
          <div id="emailError" className="error-message" role="alert">
            {errors.email}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone*</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={errors.phone ? "true" : "false"}
          aria-describedby={errors.phone ? "phoneError" : undefined}
          placeholder="123-456-7890"
        />
        {errors.phone && (
          <div id="phoneError" className="error-message" role="alert">
            {errors.phone}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="specialRequests">Special Requests</label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleInputChange}
          rows="4"
          aria-describedby="specialRequestsHint"
        ></textarea>
        <div id="specialRequestsHint" className="hint-text">
          Please let us know about any dietary restrictions or special
          accommodations.
        </div>
      </div>

      <div className="form-group">
        <button
          type="submit"
          className="button primary"
          aria-label="Make your reservation"
        >
          Make Your Reservation
        </button>
      </div>
    </form>
  );
}

export default BookingForm;
