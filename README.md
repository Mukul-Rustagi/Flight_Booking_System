﻿# Travel_Booking_Ticket
# Flight_Booking_System
# Flight and Hotel Booking API

This project is a RESTful API for managing flight and hotel bookings. It is built using **Node.js**, **Express**, and **MongoDB** and includes additional features like rate limiting, SMS notifications, and PayPal integration.

## Features
- User authentication and authorization.
- Flight and hotel management endpoints.
- Booking management with robust validations.
- Rate limiting to prevent abuse.
- SMS notifications for updates.
- PayPal integration for payment processing.
- Supports CORS for secure cross-origin requests.

## Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14 or higher)
- **MongoDB** (Local or cloud-based instance)
- **Redis** (Optional, for rate limiting)
- **PayPal Developer Account** (Optional, for PayPal integration)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   REDIS_URI=<your-redis-connection-string>
   PAYPAL_CLIENT_ID=<your-paypal-client-id>
   PAYPAL_SECRET=<your-paypal-secret>
   SMS_API_KEY=<your-sms-api-key>
   NODE_ENV=development
   ```

4. Set up MongoDB:
   Ensure MongoDB is running and accessible using the connection string provided in the `.env` file.

5. (Optional) Set up Redis:
   If rate limiting is enabled, ensure Redis is running and accessible.

6. (Optional) Set up PayPal:
   Create a PayPal developer account and use the sandbox credentials in the `.env` file.

## Running the Server

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Access the API at:
   ```
   http://localhost:<PORT>
   ```

## Project Structure
```
├── middleware/         # Custom middleware (rate limiting, notifications, etc.)
├── routes/             # API routes
├── config/             # Configuration files (MongoDB, Redis, PayPal)
├── client/             # Frontend assets (if applicable)
├── .env                # Environment variables (not included in the repository)
├── server.js           # Main server file
└── package.json        # Project dependencies and scripts
```

## API Endpoints
### Authentication
- `POST /api/auth/login` - Login endpoint.
- `POST /api/auth/register` - User registration endpoint.

### Flights
- `GET /api/flights` - Fetch all flights.
- `POST /api/flights` - Create a new flight (Admin only).

### Hotels
- `GET /api/hotels` - Fetch all hotels.
- `POST /api/hotels` - Create a new hotel (Admin only).

### Bookings
- `GET /api/bookings` - Fetch user bookings.
- `POST /api/bookings` - Create a new booking.

### Notifications
- `POST /api/notifications/send` - Send SMS notification.

### PayPal
- `POST /api/paypal/create` - Create a payment transaction.

## Middleware

### CORS
Allows cross-origin requests from specified domains.

### Rate Limiting
Prevents excessive requests to the API.

### SMS Notification
Sends SMS notifications using an external service (e.g., Twilio).

## Deployment

1. Build the frontend (if applicable):
   ```bash
   cd client
   npm run build
   ```

2. Deploy the app to your server or hosting platform (e.g., AWS, Heroku, Vercel).

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

