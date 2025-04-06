import React, { createContext, useReducer, useState } from 'react';
import { fetchAPI, submitAPI } from '../utils/api';

export const BookingContext = createContext();

const initializeTimes = () => {
  // Get today's date
  const today = new Date();
  
  // Get available times for today
  return fetchAPI(today);
};

const updateTimes = (state, action) => {
  // Update available times based on selected date
  if (action.type === 'UPDATE_TIMES') {
    const date = new Date(action.date);
    return fetchAPI(date);
  }
  return state;
};

export const BookingProvider = ({ children }) => {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const [lastBooking, setLastBooking] = useState(null);
  
  const submitReservation = (formData) => {
    // Submit reservation data to the API
    const success = submitAPI(formData);
    
    if (success) {
      setLastBooking(formData);
    }
    
    return success;
  };
  
  return (
    <BookingContext.Provider value={{ availableTimes, dispatch, submitReservation, lastBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
