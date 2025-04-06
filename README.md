# Little Lemon Restaurant Web Application

## About The Project

This is a front-end capstone project for a restaurant booking system. It's a React-based web application for the Little Lemon restaurant, featuring a responsive design, table reservation system, and accessibility features.

## Features

- Homepage with restaurant information and call-to-action
- Table reservation system with form validation
- Confirmation page for successful bookings
- Responsive design for all screen sizes
- Accessibility features for users with disabilities
- Unit tests to ensure functionality

## Technologies Used

- React
- React Router
- Jest (for testing)
- CSS (with responsive design)

## Project Structure

```
/src
  /components
    - Header.js - Contains the header with logo and navigation
    - Nav.js - Navigation component
    - Main.js - Main content wrapper
    - Footer.js - Footer with contact info and links
    - BookingForm.js - Form component for table reservations
    - BookingPage.js - Page component that contains the booking form
    - HomePage.js - Landing page component
    - ConfirmedBooking.js - Confirmation page after successful booking
  /context
    - BookingContext.js - Context for managing booking state
  /utils
    - api.js - Simulated API functions
    - validateForm.js - Form validation utility
  /tests
    - BookingForm.test.js - Tests for the booking form
  - App.js - Main application component
  - index.js - Entry point
```

## Installation and Setup

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone [https://github.com/yourusername/little-lemon-app.git](https://github.com/zahir248/little-lemon-app.git)
   ```

2. Navigate to the project directory:
   ```
   cd little-lemon-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Running Tests

To run the unit tests:

```
npm test
```

## Accessibility Features

This project implements various accessibility features:

- Semantic HTML elements
- ARIA labels and attributes
- Focus management
- Color contrast compliance
- Form validation with clear error messages
- Keyboard navigation support

## Responsive Design

The application is designed to work on devices of all sizes:

- Mobile-first approach
- Flexible layouts
- Media queries for different screen sizes
- Appropriate touch targets for mobile devices

## Form Validation

The booking form implements the following validations:

- Required fields checking
- Date validation (must be a future date)
- Email format validation
- Phone number format validation
- Number of guests range validation (1-10)

## API Simulation

Since this is a front-end project, the API calls are simulated in the `api.js` file:

- `fetchAPI(date)`: Returns available time slots for the given date
- `submitAPI(formData)`: Simulates form submission and returns a success flag

## Git Repository

The project is committed to a Git repository with:

- Well-structured commits
- Clear README documentation
- Proper .gitignore file
- Project organized into logical directories

## License

This project is part of an educational course and is for demonstration purposes only.

## Acknowledgments

- Meta Front-End Developer Professional Certificate program
- React documentation
- Jest testing framework
