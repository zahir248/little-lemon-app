import { validateForm } from '../utils/validateForm';

describe('Form Validation', () => {
  test('validates required fields', () => {
    const emptyForm = {
      date: '',
      time: '',
      guests: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: ''
    };
    
    const errors = validateForm(emptyForm);
    
    expect(errors.date).toBeTruthy();
    expect(errors.time).toBeTruthy();
    expect(errors.guests).toBeTruthy();
    expect(errors.firstName).toBeTruthy();
    expect(errors.lastName).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.phone).toBeTruthy();
  });
  
  test('validates date is not in the past', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const form = {
      date: yesterday.toISOString().split('T')[0],
      time: '19:00',
      guests: 4,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890'
    };
    
    const errors = validateForm(form);
    expect(errors.date).toBe('Date cannot be in the past');
  });
  
  test('validates email format', () => {
    const form = {
      date: '2023-12-25',
      time: '19:00',
      guests: 4,
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      phone: '123-456-7890'
    };
    
    const errors = validateForm(form);
    expect(errors.email).toBe('Please enter a valid email address');
  });
  
  test('validates phone number format', () => {
    const form = {
      date: '2023-12-25',
      time: '19:00',
      guests: 4,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '12345'
    };
    
    const errors = validateForm(form);
    expect(errors.phone).toBe('Please enter a valid phone number (e.g., 123-456-7890)');
  });
  
  test('validates number of guests range', () => {
    // Test below minimum
    let form = {
      date: '2023-12-25',
      time: '19:00',
      guests: 0,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890'
    };
    
    let errors = validateForm(form);
    expect(errors.guests).toBe('Number of guests must be at least 1');
    
    // Test above maximum
    form = {
      ...form,
      guests: 11
    };
    
    errors = validateForm(form);
    expect(errors.guests).toBe('Number of guests cannot exceed 10');
  });
  
  test('returns no errors for valid form data', () => {
    const validForm = {
      date: '2099-12-25', // Future date
      time: '19:00',
      guests: 4,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      specialRequests: 'Window seat please'
    };
    
    const errors = validateForm(validForm);
    
    // Check that no errors exist
    expect(Object.keys(errors).length).toBe(0);
  });
});