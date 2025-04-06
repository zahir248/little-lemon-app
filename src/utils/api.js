// Function to generate available time slots based on date
export const fetchAPI = (date) => {
    // This is a mock function - in a real app, this would make an API call
    // to get available times from the server
    
    // Generate random available times between 17:00 and 23:00
    const availableTimes = [];
    const possibleTimes = [
      '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
      '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
    ];
    
    // Randomly select which times are available
    // Use the date to seed the random number generator for consistent results
    const dateString = date.toISOString().split('T')[0];
    const seed = dateString.split('-').reduce((acc, val) => acc + parseInt(val), 0);
    
    possibleTimes.forEach(time => {
      // Use the seed and time to determine if this time slot is available
      const hash = (seed + time.replace(':', '')).toString();
      const randomVal = parseInt(hash[hash.length - 1] + hash[0], 10) % 10;
      
      if (randomVal > 3) { // 60% chance that a time slot is available
        availableTimes.push(time);
      }
    });
    
    // Ensure there's at least one available time
    if (availableTimes.length === 0) {
      availableTimes.push('19:00');
    }
    
    return availableTimes;
  };
  
  // Function to submit the form data
  export const submitAPI = (formData) => {
    // This is a mock function - in a real app, this would make an API call
    // to submit the form data to the server
    
    // Simulate a successful API call
    console.log('Submitting form data:', formData);
    
    // Return true to indicate success
    return true;
  };
  