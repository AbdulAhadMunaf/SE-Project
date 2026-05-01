# 🚗 Car Rental System

## Overview

A comprehensive car rental management system with web-based access for customers and staff. This system streamlines the process of renting cars, managing bookings, processing payments, and maintaining vehicle records.

## Features

### For Customers
- 🏠 **Browse Cars**: View available cars with details (model, price, location, features)
- 🗓️ **Booking**: Select pickup/return dates and locations
- 🛒 **Instant Booking**: Real-time availability check and booking confirmation
- 💳 **Payment**: Integrated payment system for booking deposits and full payments
- 📱 **Notifications**: Email and SMS notifications for booking status updates
- 👥 **Profile Management**: Manage personal information and view booking history

### For Staff
- 👥 **Customer Management**: View and manage customer records
- 🚗 **Car Management**: Add, update, and remove car listings
- 📋 **Booking Management**: View, confirm, update, and cancel bookings
- 📝 **Maintenance**: Schedule and track vehicle maintenance
- 💰 **Billing**: Manage payments and generate invoices
- 📊 **Reporting**: View system reports and statistics

## Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/)
- **Language**: JavaScript
- **Styling**: Vanilla CSS (with some utility classes)
- **Routing**: React Router DOM
- **Icons**: Lucide React

### Backend
- **Framework**: Express.js
- **Language**: JavaScript
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt for password hashing

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/download/) (v13 or higher)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   DB_URL=your_database_connection_string
   PORT=5001
   JWT_SECRET=your_secret_key
   STAFF_SECRET_KEY=your_staff_secret_key
   ```

4. Create database tables:
   ```bash
   npm start
   ```
   *(Note: The backend will automatically create tables on startup)*

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5001
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
rental/
├── backend/
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Request handlers
│   │   ├── middlewares/ # Authentication and validation
│   │   ├── models/        # Database models and queries
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   ├── .env               # Environment variables
│   └── package.json       # Dependencies
│
└── frontend/
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Page components
    │   ├── services/      # API service functions
    │   ├── context/       # React context (auth, user)
    │   ├── assets/        # Static assets
    │   └── App.jsx        # Main application component
    ├── .env               # Environment variables
    └── package.json       # Dependencies
```

## API Endpoints

### Authentication
- `POST /user/login` - User login
- `POST /user/register` - User registration
- `POST /user/staff/login` - Staff login

### Cars
- `GET /car` - Get all cars
- `GET /car/:id` - Get car by ID
- `POST /car` - Create new car (staff)
- `PUT /car/:id` - Update car (staff)
- `DELETE /car/:id` - Delete car (staff)

### Rentals
- `GET /rental` - Get all rentals
- `POST /rental` - Create new rental
- `GET /rental/:id` - Get rental by ID
- `PUT /rental/:id` - Update rental (staff)
- `DELETE /rental/:id` - Cancel rental (staff)

### Payments
- `POST /payment` - Process payment
- `GET /payment` - Get all payments

### Maintenance
- `POST /maintenance/report` - Report car issue
- `GET /maintenance` - Get maintenance records
- `POST /maintenance` - Schedule maintenance (staff)
- `PUT /maintenance/:id` - Update maintenance record (staff)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


