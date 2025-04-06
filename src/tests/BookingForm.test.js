import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { BookingContext } from './context/BookingContext';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('BookingForm Component', () => {
  const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
  const mockDispatch = jest.fn();
  const mockSubmitReservation = jest.fn().mockReturnValue(true);
  
  const renderBookingForm = () => {
    return render(
      <BrowserRouter>
        <BookingContext.Provider value={{
          availableTimes: mockAvailableTimes,
          dispatch: mockDispatch,
          submitReservation: mockSubmitReservation
        }}>
          <BookingForm />
        </BookingContext.Provider>
      </BrowserRouter>
    );
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders the booking form with all necessary fields', () => {
    renderBookingForm();
    
    // Check if all required form elements are present
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /make your reservation/i })).toBeInTheDocument();
  });
  
  test('updates available times when date is selected', () => {
    renderBookingForm();
    
    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: '2023-12-25' } });
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_TIMES',
      date: '2023-12-25'
    });
  });
  
  test('validates required fields on submit', async () => {
    renderBookingForm();
    
    // Submit the form without filling required fields
    const submitButton = screen.getByRole('button', { name: /make your reservation/i });
    fireEvent.click(submitButton);
    
    // Check for error messages
    await waitFor(() => {
      expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
      expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
    });
    
    // Verify that submitReservation was not called
    expect(mockSubmitReservation).not.toHaveBeenCalled();
  });
  
  test('validates email format', async () => {
    renderBookingForm();
    
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });
  
  test('validates phone number format', async () => {
    renderBookingForm();
    
    const phoneInput = screen.getByLabelText(/phone/i);
    fireEvent.change(phoneInput, { target: { value: '12345' } });
    fireEvent.blur(phoneInput);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
    });
  });
  
  test('validates number of guests range', async () => {
    renderBookingForm();
    
    const guestsInput = screen.getByLabelText(/number of guests/i);
    
    // Test value below minimum
    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.blur(guestsInput);
    
    await waitFor(() => {
      expect(screen.getByText(/number of guests must be at least 1/i)).toBeInTheDocument();
    });
    
    // Test value above maximum
    fireEvent.change(guestsInput, { target: { value: '11' } });
    fireEvent.blur(guestsInput);
    
    await waitFor(() => {
      expect(screen.getByText(/number of guests cannot exceed 10/i)).toBeInTheDocument();
    });
  });
  
  test('submits the form when all fields are valid', async () => {
    renderBookingForm();
    
    // Fill in all required fields
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2023-12-25' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '19:00' } });
    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: 4 } });
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '123-456-7890' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /make your reservation/i }));
    
    // Verify that submitReservation was called with the correct data
    await waitFor(() => {
      expect(mockSubmitReservation).toHaveBeenCalledWith({
        date: '2023-12-25',
        time: '19:00',
        guests: 4,
        occasion: 'Birthday',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        specialRequests: ''
      });
    });
  });
});