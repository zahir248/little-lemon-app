import { fetchAPI, submitAPI } from '../utils/api';

describe('API Functions', () => {
  test('fetchAPI returns an array of time strings', () => {
    const date = new Date('2023-12-25');
    const times = fetchAPI(date);
    
    expect(Array.isArray(times)).toBe(true);
    
    // Check that at least one time is available
    expect(times.length).toBeGreaterThan(0);
    
    // Check that times are in correct format (24-hour format)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    times.forEach(time => {
      expect(time).toMatch(timeRegex);
    });
  });
  
  test('submitAPI returns true to indicate successful submission', () => {
    const formData = {
      date: '2023-12-25',
      time: '19:00',
      guests: 4,
      occasion: 'Birthday',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
    };
    
    const result = submitAPI(formData);
    expect(result).toBe(true);
  });
});