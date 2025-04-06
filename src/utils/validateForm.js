// validateForm.js
export const validateForm = (formData) => {
    const errors = {};
    
    // Validate date
    if (!formData.date) {
      errors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.date = 'Date cannot be in the past';
      }
    }
    
    // Validate time
    if (!formData.time) {
      errors.time = 'Please select a time';
    }
    
    // Validate number of guests
    if (!formData.guests) {
      errors.guests = 'Please enter number of guests';
    } else if (formData.guests < 1) {
      errors.guests = 'Number of guests must be at least 1';
    } else if (formData.guests > 10) {
      errors.guests = 'Number of guests cannot exceed 10';
    }
    
    // Validate first name
    if (!formData.firstName) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    
    // Validate last name
    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
    
    // Validate email
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Validate phone
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number (e.g., 123-456-7890)';
    }
    
    return errors;
  };