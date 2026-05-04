# Software Requirements Specification

## for

# Car Rental System

**Version 1.0 approved**

**Prepared by:**
- Muhammad Masab — Roll No. 23k-0833
- Meeran Uz Zaman — Roll No. 23k-0039
- Abdul Ahad Munaf — Roll No. 23k-0590

**Organization:** SE Project Team

**Date Created:** May 3, 2026

---

## Table of Contents

- [Revision History](#revision-history)
- [1. Introduction](#1-introduction)
  - [1.1 Purpose](#11-purpose)
  - [1.2 Document Conventions](#12-document-conventions)
  - [1.3 Intended Audience and Reading Suggestions](#13-intended-audience-and-reading-suggestions)
  - [1.4 Product Scope](#14-product-scope)
  - [1.5 References](#15-references)
- [2. Overall Description](#2-overall-description)
  - [2.1 Product Perspective](#21-product-perspective)
  - [2.2 Product Functions](#22-product-functions)
  - [2.3 User Classes and Characteristics](#23-user-classes-and-characteristics)
  - [2.4 Operating Environment](#24-operating-environment)
  - [2.5 Design and Implementation Constraints](#25-design-and-implementation-constraints)
  - [2.6 User Documentation](#26-user-documentation)
  - [2.7 Assumptions and Dependencies](#27-assumptions-and-dependencies)
- [3. External Interface Requirements](#3-external-interface-requirements)
  - [3.1 User Interfaces](#31-user-interfaces)
  - [3.2 Hardware Interfaces](#32-hardware-interfaces)
  - [3.3 Software Interfaces](#33-software-interfaces)
  - [3.4 Communications Interfaces](#34-communications-interfaces)
- [4. System Features](#4-system-features)
  - [4.1 User Registration and Authentication](#41-user-registration-and-authentication)
  - [4.2 Car Browsing and Search](#42-car-browsing-and-search)
  - [4.3 Rental Booking](#43-rental-booking)
  - [4.4 Payment Processing](#44-payment-processing)
  - [4.5 Car Fleet Management (Staff)](#45-car-fleet-management-staff)
  - [4.6 Booking Request Management (Staff)](#46-booking-request-management-staff)
  - [4.7 Vehicle Maintenance Management (Staff)](#47-vehicle-maintenance-management-staff)
  - [4.8 User Profile Management](#48-user-profile-management)
- [5. Other Nonfunctional Requirements](#5-other-nonfunctional-requirements)
  - [5.1 Performance Requirements](#51-performance-requirements)
  - [5.2 Safety Requirements](#52-safety-requirements)
  - [5.3 Security Requirements](#53-security-requirements)
  - [5.4 Software Quality Attributes](#54-software-quality-attributes)
  - [5.5 Business Rules](#55-business-rules)
- [6. Other Requirements](#6-other-requirements)
- [Appendix A: Glossary](#appendix-a-glossary)
- [Appendix B: Analysis Models](#appendix-b-analysis-models)
- [Appendix C: To Be Determined List](#appendix-c-to-be-determined-list)

---

## Revision History

| Name             | Date       | Reason For Changes        | Version |
| ---------------- | ---------- | ------------------------- | ------- |
| Muhammad Masab, Meeran Uz Zaman, Abdul Ahad Munaf | 2026-05-03 | Initial document creation | 1.0 |

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) describes the functional and non-functional requirements for the **Car Rental System**, version 1.0. The system is a full-stack web application that enables customers to browse vehicles, make rental bookings, and process payments, while providing staff members with tools to manage the car fleet, approve or decline booking requests, and track vehicle maintenance.

This document covers the complete system, including the customer-facing web interface, the staff management interface, the RESTful backend API, and the PostgreSQL database layer.

### 1.2 Document Conventions

- **Shall** indicates a mandatory requirement.
- **Should** indicates a recommended but not mandatory requirement.
- **May** indicates an optional requirement.
- Requirements are identified with unique tags in the format `REQ-<FEATURE>-<NUMBER>` (e.g., `REQ-AUTH-1`).
- Priority levels are designated as **High**, **Medium**, or **Low**.
- Higher-level requirements do not automatically confer their priority to sub-requirements; each requirement carries its own explicitly stated priority.

### 1.3 Intended Audience and Reading Suggestions

This document is intended for the following audiences:

| Audience                               | Relevant Sections                               |
| -------------------------------------- | ----------------------------------------------- |
| **Developers**                   | All sections, with emphasis on Sections 3 and 4 |
| **Project Managers**             | Sections 1, 2, and 5                            |
| **Testers / QA**                 | Sections 4 and 5                                |
| **End Users (Customer & Staff)** | Sections 2 and 4                                |
| **Database Administrators**      | Sections 3.3 and 6                              |

It is recommended to read this document sequentially, beginning with Section 1 (Introduction) and Section 2 (Overall Description) to establish context, then proceeding to Section 4 (System Features) for detailed functional requirements, and finally Section 5 (Nonfunctional Requirements) for quality and constraint requirements.

### 1.4 Product Scope

The **Car Rental System** is a self-contained, greenfield web application designed to digitize and streamline the vehicle rental workflow. The system aims to:

- Eliminate manual, paper-based booking and inventory processes.
- Provide customers with a 24/7 online platform to browse available cars, check pricing, and submit rental requests.
- Equip staff with a centralized dashboard to manage the car fleet, handle booking approvals, and schedule vehicle maintenance.
- Process rental payments securely using Visa and Mastercard with real-time card validation.
- Maintain a complete, auditable record of all rentals, payments, and maintenance activities.

The product is intended for use by a single rental business with multiple staff members and a potentially large customer base.

### 1.5 References

| # | Document / Resource              | Description                                                            |
| - | -------------------------------- | ---------------------------------------------------------------------- |
| 1 | IEEE Std 830-1998                | IEEE Recommended Practice for Software Requirements Specifications     |
| 2 | `backend/src/data/`            | PostgreSQL schema initialization scripts defining all table structures |
| 3 | `backend/src/routes/`          | Express.js route definitions listing all API endpoints                 |
| 4 | `frontend/src/App.jsx`         | React Router configuration defining all frontend page routes           |
| 5 | `README.md`                    | Project overview and setup instructions                                |
| 6 | Cloudinary Documentation         | Third-party image hosting service used for car images                  |
| 7 | RFC 7519 – JSON Web Token (JWT) | Standard used for authentication token format                          |
| 8 | Luhn Algorithm (ISO/IEC 7812)    | Standard used for payment card number validation                       |

---

## 2. Overall Description

### 2.1 Product Perspective

The Car Rental System is a new, standalone web application. It is not a replacement for a prior system; rather, it is built from scratch to replace a presumed manual or paper-based rental process.

The system follows a standard three-tier client–server architecture:

```
┌──────────────────────────────────────────────────────┐
│                    CLIENT TIER                       │
│           React 18 SPA (Vite + Tailwind CSS)         │
│  ┌─────────────────────┐ ┌────────────────────────┐  │
│  │   Customer Portal   │ │    Staff Dashboard     │  │
│  └─────────────────────┘ └────────────────────────┘  │
└──────────────────┬───────────────────────────────────┘
                   │ HTTP/REST (JSON)
┌──────────────────▼───────────────────────────────────┐
│                   APPLICATION TIER                   │
│              Node.js + Express.js 5 API              │
│  ┌──────────┐ ┌──────────┐ ┌────────────────────┐   │
│  │   Auth   │ │  Routes  │ │    Controllers     │   │
│  │  (JWT)   │ │ /user    │ │  userController    │   │
│  └──────────┘ │ /car     │ │  carController     │   │
│               │ /rental  │ │  rentalController  │   │
│               │ /payment │ │  paymentController │   │
│               │ /maint.  │ │  maintController   │   │
│               └──────────┘ └────────────────────┘   │
└──────────────────┬───────────────────────────────────┘
                   │ SQL (pg pool)
┌──────────────────▼───────────────────────────────────┐
│                     DATA TIER                        │
│               PostgreSQL 13+ Database                │
│   users │ customers │ staff │ cars │ rentals         │
│   payments │ maintenance                             │
└──────────────────────────────────────────────────────┘
                   │ HTTPS
┌──────────────────▼───────────────────────────────────┐
│              EXTERNAL SERVICE                        │
│         Cloudinary (Car Image Storage)               │
└──────────────────────────────────────────────────────┘
```

### 2.2 Product Functions

The major functions provided by the system are:

**Customer-Facing Functions:**

- User registration and login (JWT-based authentication)
- Browse and search available rental cars with filters (model, year, price range)
- View detailed car information including images and pricing
- Submit rental booking requests with start/end dates
- Pay for bookings using Visa or Mastercard
- Track current and past bookings
- Manage personal profile (name, phone number, driver's license)

**Staff-Facing Functions:**

- Staff registration (protected by secret key) and login
- View and manage the full car inventory (create, update, delete)
- Upload car images via Cloudinary
- Review all incoming rental requests
- Approve or decline rental requests
- End active rentals and return cars to available status
- Schedule and manage vehicle maintenance
- View all customers and system users

### 2.3 User Classes and Characteristics

#### 2.3.1 Customer

- **Description:** Members of the public who register to rent vehicles.
- **Technical Expertise:** Low to moderate; expected to be comfortable using web browsers.
- **Frequency of Use:** Infrequent to occasional (a few times per year).
- **Privileges:** Can browse cars publicly; must be logged in to book. Can only access their own booking and profile data.
- **Priority:** High — this is the primary revenue-generating user class.

#### 2.3.2 Staff Member

- **Description:** Employees of the rental business responsible for managing operations.
- **Technical Expertise:** Moderate; familiar with web-based management tools.
- **Frequency of Use:** Daily.
- **Privileges:** Full access to car management, all rental requests, maintenance records, and all user data. Must possess the `STAFF_SECRET_KEY` to register.
- **Priority:** High — the system cannot function without staff managing bookings.

#### 2.3.3 Unauthenticated Visitor

- **Description:** Any user browsing without being logged in.
- **Privileges:** Can view the home page and browse the car catalog (name, year, price, image). Cannot book or view detailed car data.
- **Priority:** Medium — supporting visibility may drive new customer registrations.

### 2.4 Operating Environment

| Component                   | Requirement                                                              |
| --------------------------- | ------------------------------------------------------------------------ |
| **Backend Runtime**   | Node.js (v18 or later)                                                   |
| **Backend Framework** | Express.js 5.1.0                                                         |
| **Database**          | PostgreSQL 13 or later                                                   |
| **Frontend Build**    | Vite 6.4.1                                                               |
| **Frontend Runtime**  | Any modern web browser (Chrome 90+, Firefox 90+, Safari 14+, Edge 90+)   |
| **Operating System**  | Linux, macOS, or Windows (development); Linux recommended for production |
| **Network**           | HTTPS in production; HTTP acceptable in development                      |
| **External Services** | Cloudinary (image hosting); internet access required                     |

### 2.5 Design and Implementation Constraints

- **Language:** The backend must be implemented in JavaScript (Node.js ES Modules). The frontend must be implemented in React 18 with JSX.
- **Database:** PostgreSQL is the only supported database. The schema uses PostgreSQL-specific features (`SERIAL`, `CHECK` constraints, row-level locking with `FOR UPDATE`).
- **Authentication:** All protected routes shall use JWT Bearer tokens. Tokens are stored in the browser's `localStorage`.
- **Payment Methods:** Only Visa and Mastercard are supported. Payment card numbers must pass Luhn algorithm validation and BIN-range matching.
- **Image Hosting:** Car images shall be hosted exclusively on Cloudinary. No binary image data is stored in the database.
- **Connection Pooling:** The PostgreSQL client uses a connection pool with a maximum of 5 concurrent connections and a 30-second idle timeout.
- **CORS:** The backend enables CORS to allow requests from the frontend origin.
- **Transactions:** Any operation spanning multiple database tables (booking creation, approval, decline) must be wrapped in a database transaction with `BEGIN`/`COMMIT`/`ROLLBACK`.
- **Environment Configuration:** All secrets (JWT key, database URL, staff secret key, Cloudinary credentials) must be supplied via environment variables and never hardcoded.

### 2.6 User Documentation

The following documentation will be delivered with the system:

| Document            | Format         | Audience                                                 |
| ------------------- | -------------- | -------------------------------------------------------- |
| `README.md`       | Markdown       | Developers — setup, installation, environment variables |
| Inline API comments | Source code    | Developers                                               |
| This SRS            | Markdown / PDF | All stakeholders                                         |

No end-user manual or in-app tutorial is included in version 1.0 (see Appendix C, TBD-1).

### 2.7 Assumptions and Dependencies

- **A1:** Users have access to a modern web browser with JavaScript enabled.
- **A2:** The deployment server has a stable internet connection for Cloudinary image uploads and JWT operations.
- **A3:** The Cloudinary free-tier or paid plan remains available and the configured cloud name is valid.
- **A4:** The `STAFF_SECRET_KEY` is kept confidential and distributed only to authorized employees.
- **A5:** All date calculations assume the server and database are in the same timezone.
- **A6:** Payment processing is simulated; the system does not integrate with a real payment gateway. Card data is validated locally but not transmitted to any external payment processor.
- **D1:** The system depends on `pg` (node-postgres) library version 8+ for database access.
- **D2:** The system depends on `jsonwebtoken` for token signing and verification.
- **D3:** The system depends on `bcrypt` for password hashing (10 salt rounds).
- **D4:** The system depends on `joi` 18+ for backend input validation schemas.
- **D5:** The frontend depends on `react-router-dom` 6 for client-side routing.

---

## 3. External Interface Requirements

### 3.1 User Interfaces

The application provides a single-page application (SPA) frontend built with React and styled using Tailwind CSS. The UI follows a responsive, mobile-first layout.

**General UI Conventions:**

- A persistent **Header** component appears on every page, displaying the site logo, navigation links, and a login/logout button. Navigation items are role-aware (customer links vs. staff links).
- A persistent **Footer** appears on every page.
- A **Toast** notification component displays success and error messages at the top of the viewport after user actions.
- A **Modal** dialog is used for inline forms (add/edit car) to avoid full page redirects.
- **ProtectedRoute** components guard all authenticated pages and redirect unauthenticated users to `/login`.
- Error states and loading spinners are shown inline within page content areas.

**Key Pages:**

| Route                      | Page                                      | Accessible By   |
| -------------------------- | ----------------------------------------- | --------------- |
| `/`                      | Home — featured cars carousel            | All             |
| `/cars`                  | Car catalog with filters and pagination   | All             |
| `/cars/:id`              | Car detail view                           | Authenticated   |
| `/login`                 | Login form                                | Unauthenticated |
| `/register`              | Registration form                         | Unauthenticated |
| `/account`               | User profile editor                       | Authenticated   |
| `/customer/bookings`     | Active and pending booking list           | Customer        |
| `/customer/book/:id`     | Booking form with date picker and payment | Customer        |
| `/customer/book/confirm` | Booking confirmation screen               | Customer        |
| `/staff`                 | Staff overview dashboard                  | Staff           |
| `/staff/manage-cars`     | Car CRUD interface                        | Staff           |
| `/staff/pending`         | Pending booking requests list             | Staff           |
| `/staff/maintenance`     | Maintenance record management             | Staff           |

**Car Search / Filter Panel:**

- Filters: model text search, year (exact or min/max range), price range (min/max), availability status.
- Sort: price ascending/descending, year ascending/descending, model ascending/descending.
- Pagination controls with configurable page size.

### 3.2 Hardware Interfaces

The system has no direct hardware interfaces. It operates entirely over standard network connections. The frontend requires a display with a minimum resolution of 320px width for mobile usability. No peripheral devices are required beyond standard keyboard and mouse/touchscreen input.

### 3.3 Software Interfaces

| Interface                        | Details                                                                                                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **PostgreSQL 13+**         | Accessed via `pg` (node-postgres) connection pool. Database URL supplied via `DB_URL` environment variable. Tables: `users`, `customers`, `staff`, `cars`, `rentals`, `payments`, `maintenance`. All queries use parameterized statements. |
| **Cloudinary REST API**    | Used by the `ImageUploader` frontend component to upload car images. Cloud name configured via `VITE_CLOUDINARY_CLOUD_NAME`. Returns a secure image URL stored in the `cars.carImageUrl` column.                                                       |
| **JWT (`jsonwebtoken`)** | Used to sign and verify authentication tokens. Secret configured via `JWT_SECRET`. Tokens expire per `JWT_EXPIRES` (default 1 hour).                                                                                                                     |
| **bcrypt**                 | Used for password hashing (10 salt rounds) before storage, and comparison during login.                                                                                                                                                                      |
| **Joi**                    | Used on the backend for validating request body payloads for user registration and login.                                                                                                                                                                    |
| **React Router DOM 6**     | Provides client-side routing for the SPA frontend.`AuthContext` provides global auth state.                                                                                                                                                                |

### 3.4 Communications Interfaces

- **Protocol:** HTTP/1.1 (development) and HTTPS/TLS 1.2+ (production).
- **API Style:** RESTful JSON API. All requests and responses use `application/json` content type.
- **Authentication Header:** `Authorization: Bearer <JWT_TOKEN>` on all protected routes.
- **Default Port:** Backend listens on port `5001` (configurable via `PORT` environment variable). Frontend dev server runs on port `5173` (Vite default).
- **CORS:** The backend enables CORS for all origins in development. Production should restrict this to the known frontend origin.
- **Response Envelope:** All API responses follow a standard envelope:
  ```json
  {
    "status": 200,
    "message": "Human-readable description",
    "data": { }
  }
  ```
- **Error Responses:** Non-2xx responses include `status` (HTTP code) and `message` (error description). A global error handler middleware catches unhandled errors and returns a 500 response.

---

## 4. System Features

### 4.1 User Registration and Authentication

#### 4.1.1 Description and Priority

This feature allows new users to create accounts and existing users to log in. The system supports two roles: **customer** and **staff**. Authentication is token-based using JWT. **Priority: High.**

#### 4.1.2 Stimulus/Response Sequences

**Customer Registration:**

1. Unauthenticated visitor navigates to `/register`.
2. User enters username, password, full name, phone number, and driver's license number.
3. User submits the form.
4. System validates inputs (Joi schema), hashes the password with bcrypt, and creates a `users` record (role: `customer`) and a linked `customers` record in a single transaction.
5. System responds with the new user's ID and confirmation message.

**Staff Registration:**

1. Staff member navigates to `/register` and selects the staff role.
2. User enters username, password, full name, phone number, and the `STAFF_SECRET_KEY`.
3. System validates the secret key, creates a `users` record (role: `staff`) and a linked `staff` record.
4. System responds with confirmation.

**Login:**

1. User navigates to `/login` and enters username and password.
2. System looks up the user by username, compares the bcrypt hash.
3. On success, system issues a signed JWT containing `userId` and `role` with the configured expiry.
4. Frontend stores the token in `localStorage` and updates `AuthContext`.
5. User is redirected to their role-appropriate landing page.

**Logout:**

1. User clicks the logout button in the Header.
2. Frontend clears the token from `localStorage` and resets `AuthContext`.
3. User is redirected to the home page.

#### 4.1.3 Functional Requirements

| ID         | Requirement                                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| REQ-AUTH-1 | The system shall allow any visitor to register as a customer by providing a unique username, a password, a full name, an 11-digit phone number, and a driver's license number. |
| REQ-AUTH-2 | The system shall allow registration as a staff member only when a valid `STAFF_SECRET_KEY` is provided alongside the required profile fields.                                |
| REQ-AUTH-3 | Passwords shall be hashed using bcrypt with a minimum of 10 salt rounds before storage. Plaintext passwords shall never be stored.                                             |
| REQ-AUTH-4 | Usernames shall be unique across all users. The system shall return an error if a duplicate username is submitted.                                                             |
| REQ-AUTH-5 | Upon successful login, the system shall return a signed JWT token containing the user's ID and role, with a configurable expiration time (default: 1 hour).                    |
| REQ-AUTH-6 | All routes except public car browsing and login/register shall require a valid JWT Bearer token in the `Authorization` header.                                               |
| REQ-AUTH-7 | Role-based middleware shall prevent customers from accessing staff routes and vice versa, returning HTTP 403 on unauthorized access.                                           |
| REQ-AUTH-8 | Phone numbers shall be validated to contain exactly 11 numeric digits.                                                                                                         |

---

### 4.2 Car Browsing and Search

#### 4.2.1 Description and Priority

This feature enables all visitors (authenticated and unauthenticated) to view the car catalog and search/filter vehicles by multiple criteria. Car detail pages require authentication. **Priority: High.**

#### 4.2.2 Stimulus/Response Sequences

**Browse Cars:**

1. User navigates to `/cars`.
2. System fetches all cars from the database with the current `FiltersPanel` state applied.
3. System displays paginated car cards showing model, year, price, status, and thumbnail image.

**Search/Filter:**

1. User enters search terms and/or adjusts filter sliders in the `FiltersPanel`.
2. Frontend sends a `GET /car/search` request with query parameters.
3. Backend applies filters (case-insensitive model search, year range, price range, status) and sort order.
4. System returns paginated results with total count metadata.
5. Frontend updates the car grid and pagination controls.

**View Car Detail:**

1. Authenticated user clicks a car card.
2. System fetches the single car record by ID.
3. System displays full details: model, year, status, daily price, and full-size image.

#### 4.2.3 Functional Requirements

| ID        | Requirement                                                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| REQ-CAR-1 | The system shall expose a public endpoint to retrieve a list of all cars.                                                                                                            |
| REQ-CAR-2 | The system shall support filtering cars by: model name (partial, case-insensitive match), exact year, minimum year, maximum year, status, minimum price, and maximum price.          |
| REQ-CAR-3 | The system shall support sorting results by: price ascending, price descending, year ascending, year descending, model ascending, and model descending.                              |
| REQ-CAR-4 | The search endpoint shall return paginated results. The `page` and `limit` query parameters shall control pagination. The maximum `limit` value shall be 100 records per page. |
| REQ-CAR-5 | The search endpoint shall return the total count of matching records alongside the paginated subset, enabling the frontend to render pagination controls.                            |
| REQ-CAR-6 | Viewing the detail page of an individual car shall require the user to be authenticated.                                                                                             |
| REQ-CAR-7 | Each car record shall include: car model name, model year, daily rental price, current status, and image URL.                                                                        |

---

### 4.3 Rental Booking

#### 4.3.1 Description and Priority

This feature allows customers to request a car rental for a specified date range and to view their current and historical bookings. **Priority: High.**

#### 4.3.2 Stimulus/Response Sequences

**Create Booking:**

1. Authenticated customer navigates to a car's detail page and clicks "Book Now."
2. Customer is taken to `/customer/book/:carId`.
3. Customer selects a start date and end date. System calculates the total cost (days × daily price).
4. Customer enters payment card details (card number, card type).
5. Customer submits the form.
6. System validates card (Luhn + BIN), processes the payment (`POST /payment/confirmPayment`), then creates the rental (`POST /rental/create`) in a database transaction.
7. Car status is changed to `requested`.
8. Customer is redirected to `/customer/book/confirm` with booking confirmation details.

**View Bookings:**

1. Customer navigates to `/customer/bookings`.
2. System fetches the customer's active rentals (`GET /rental/currentRentals/:id`) and pending requests (`GET /rental/pendingRequests/:id`).
3. System displays two lists: current active rentals and pending/declined bookings.

#### 4.3.3 Functional Requirements

| ID           | Requirement                                                                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| REQ-RENTAL-1 | The system shall allow an authenticated customer to submit a rental request for an available car by specifying a start date and an end date.         |
| REQ-RENTAL-2 | The end date shall be strictly after the start date. The system shall reject bookings where `endDate <= startDate`.                                |
| REQ-RENTAL-3 | The system shall calculate the total rental amount as `(endDate - startDate) in days × car daily price`.                                          |
| REQ-RENTAL-4 | Payment must be successfully processed before a rental record is created. If payment fails, no rental record shall be created.                       |
| REQ-RENTAL-5 | Upon successful booking, the car's status shall be updated from `available` to `requested`.                                                      |
| REQ-RENTAL-6 | A new rental record shall be created with status `requested`.                                                                                      |
| REQ-RENTAL-7 | The system shall allow a customer to view their own active rentals (status:`active`) and pending requests (status: `requested` or `declined`). |
| REQ-RENTAL-8 | A customer shall not be able to view another customer's booking data.                                                                                |
| REQ-RENTAL-9 | The booking creation shall be executed within a single database transaction; failure at any step shall roll back all changes.                        |

---

### 4.4 Payment Processing

#### 4.4.1 Description and Priority

This feature handles in-system card payment validation and record-keeping for all rental transactions. **Priority: High.**

#### 4.4.2 Stimulus/Response Sequences

**Process Payment:**

1. Customer submits booking form with card details.
2. System validates card number using the Luhn algorithm.
3. System determines card type (Visa or Mastercard) from BIN range.
4. System verifies declared card type matches detected card type.
5. If valid, a `payments` record is inserted with amount, date, method, and card number.
6. Payment ID is returned and used to create the associated rental record.

**Refund on Decline:**

1. Staff declines a rental request (see Feature 4.6).
2. System deletes the associated `payments` record.
3. Rental status is updated to `declined`.

#### 4.4.3 Functional Requirements

| ID        | Requirement                                                                                                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| REQ-PAY-1 | The system shall only accept Visa and Mastercard payment methods.                                                                                                             |
| REQ-PAY-2 | All card numbers shall be validated using the Luhn (mod 10) algorithm. The system shall reject any card number that fails this check.                                         |
| REQ-PAY-3 | Card type shall be determined from the card's BIN range: Visa cards start with `4`; Mastercard cards start with `51`–`55` or fall in the range `222221`–`272099`. |
| REQ-PAY-4 | The declared card type shall match the BIN-detected card type. The system shall return an error if they differ.                                                               |
| REQ-PAY-5 | Card numbers shall be exactly 16 digits.                                                                                                                                      |
| REQ-PAY-6 | A payment record shall store: payment amount, timestamp, payment method, and card number (stored in lowercase).                                                               |
| REQ-PAY-7 | When a rental is declined by staff, the associated payment record shall be deleted (refund).                                                                                  |
| REQ-PAY-8 | The system shall provide an endpoint for retrieving a payment record by ID for authenticated users.                                                                           |

---

### 4.5 Car Fleet Management (Staff)

#### 4.5.1 Description and Priority

This feature allows staff members to add new cars to the fleet, update car details, remove cars, and manage car images. **Priority: High.**

#### 4.5.2 Stimulus/Response Sequences

**Add Car:**

1. Staff navigates to `/staff/manage-cars` and clicks "Add Car."
2. A Modal opens with fields: model name, year, daily price, and image uploader.
3. Staff uploads an image via the `ImageUploader` component (Cloudinary).
4. Staff submits the form. System creates a new `cars` record with status `available`.

**Update Car:**

1. Staff clicks "Edit" on a car in the management table.
2. Modal opens pre-filled with current car details.
3. Staff modifies fields and submits.
4. System updates the car record only if no active or requested rentals exist for that car.

**Delete Car:**

1. Staff clicks "Delete" on a car.
2. System removes the car record.

**Set to Maintenance:**

1. Staff clicks a maintenance action on an available car.
2. Car status is changed to `maintenance` and linked to a maintenance record.

#### 4.5.3 Functional Requirements

| ID          | Requirement                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| REQ-FLEET-1 | Only authenticated staff members shall be able to create, update, or delete car records.                                                    |
| REQ-FLEET-2 | A new car record shall require: model name, model year (between 1980 and the current year inclusive), daily price (≥ 0), and an image URL. |
| REQ-FLEET-3 | Car status shall be one of:`available`, `requested`, `rented`, or `maintenance`.                                                    |
| REQ-FLEET-4 | The system shall prevent updating a car's details if the car has any rentals with status `active` or `requested`.                       |
| REQ-FLEET-5 | Car images shall be uploaded to Cloudinary by the frontend; the resulting secure URL shall be stored in `cars.carImageUrl`.               |
| REQ-FLEET-6 | Staff shall be able to retrieve all cars regardless of status.                                                                              |
| REQ-FLEET-7 | Deleting a car record shall be permitted for staff via the `DELETE /car/cars/:id` endpoint.                                               |

---

### 4.6 Booking Request Management (Staff)

#### 4.6.1 Description and Priority

This feature gives staff members the ability to review all pending rental requests and take action by approving or declining them. **Priority: High.**

#### 4.6.2 Stimulus/Response Sequences

**View Pending Requests:**

1. Staff navigates to `/staff/pending`.
2. System fetches all rentals with status `requested` via `GET /rental/pendingRequests`.
3. Staff sees customer name, car model, dates, and total amount for each request.

**Approve Request:**

1. Staff clicks "Approve" on a request.
2. System calls `POST /rental/approveRental` with the rental ID.
3. In a transaction: rental status → `active`, car status → `rented`, staff ID is recorded on the rental.
4. Confirmation shown to staff.

**Decline Request:**

1. Staff clicks "Decline" on a request.
2. System calls `POST /rental/declineRental` with the rental ID.
3. In a transaction: rental status → `declined`, associated payment record deleted, car status reverted.
4. Confirmation shown to staff.

**End Active Rental:**

1. Staff clicks "End Rental" on an active booking.
2. System calls `POST /rental/endRental/:carId`.
3. Rental status → `completed`, car status → `available` (or `requested` if other pending bookings exist for that car).

#### 4.6.3 Functional Requirements

| ID         | Requirement                                                                                                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| REQ-BOOK-1 | Only staff members shall be able to view all pending rental requests across all customers.                                                                                                         |
| REQ-BOOK-2 | Staff shall be able to approve a pending rental request, transitioning the rental status to `active` and the car status to `rented`.                                                           |
| REQ-BOOK-3 | Staff shall be able to decline a pending rental request, transitioning the rental status to `declined` and deleting the associated payment record.                                               |
| REQ-BOOK-4 | Staff shall be able to end an active rental, transitioning the rental status to `completed`.                                                                                                     |
| REQ-BOOK-5 | When an active rental ends, the car's status shall revert to `available`, unless other `requested` rentals exist for the same car, in which case the car status shall be set to `requested`. |
| REQ-BOOK-6 | Approval and decline operations shall be executed within database transactions with rollback on failure.                                                                                           |
| REQ-BOOK-7 | The staff member who approves a request shall have their `staffId` recorded on the rental record.                                                                                                |

---

### 4.7 Vehicle Maintenance Management (Staff)

#### 4.7.1 Description and Priority

This feature allows staff to schedule and track maintenance activities for fleet vehicles. **Priority: Medium.**

#### 4.7.2 Stimulus/Response Sequences

**Create Maintenance Record:**

1. Staff navigates to `/staff/maintenance` or triggers maintenance from `/staff/manage-cars`.
2. Staff enters maintenance type, date, and cost.
3. System creates a `maintenance` record and links it to the target car.
4. Car status is changed to `maintenance`.

**View/Edit/Delete Records:**

1. Staff navigates to `/staff/maintenance`.
2. System displays all maintenance records.
3. Staff can edit a record (update type, date, cost) or delete it.
4. Deleting a maintenance record unlinks it from the car and reverts the car status to `available`.

#### 4.7.3 Functional Requirements

| ID          | Requirement                                                                                                           |
| ----------- | --------------------------------------------------------------------------------------------------------------------- |
| REQ-MAINT-1 | Only staff members shall be able to create, read, update, or delete maintenance records.                              |
| REQ-MAINT-2 | A maintenance record shall include: maintenance type, maintenance date (default: current date), and maintenance cost. |
| REQ-MAINT-3 | When a maintenance record is created and linked to a car, the car's status shall be set to `maintenance`.           |
| REQ-MAINT-4 | Only cars with status `available` may be placed into `maintenance` status.                                        |
| REQ-MAINT-5 | When a maintenance record linked to a car is deleted, the car's status shall revert to `available`.                 |
| REQ-MAINT-6 | Staff shall be able to retrieve all maintenance records across the fleet.                                             |
| REQ-MAINT-7 | Staff shall be able to update any field of an existing maintenance record.                                            |

---

### 4.8 User Profile Management

#### 4.8.1 Description and Priority

This feature allows both customers and staff to view and update their profile information. **Priority: Medium.**

#### 4.8.2 Stimulus/Response Sequences

**Update Customer Profile:**

1. Customer navigates to `/account`.
2. System fetches the customer's current profile (name, phone, driver's license).
3. Customer modifies fields and submits.
4. System updates the `customers` record. Phone validation is applied.

**Update Staff Profile:**

1. Staff member navigates to `/account`.
2. System fetches the staff's current profile (name, phone).
3. Staff modifies fields and submits.
4. System updates the `staff` record.

**Update Credentials:**

1. Authenticated user calls `PUT /user/users/:id` with a new username or hashed password.
2. System validates uniqueness of new username and updates the `users` record.

#### 4.8.3 Functional Requirements

| ID            | Requirement                                                                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| REQ-PROFILE-1 | An authenticated customer shall be able to update their full name, phone number, and driver's license number.                                        |
| REQ-PROFILE-2 | An authenticated staff member shall be able to update their full name and phone number.                                                              |
| REQ-PROFILE-3 | A user shall only be able to update their own profile. The system shall reject requests where the token's user ID does not match the target user ID. |
| REQ-PROFILE-4 | The system shall enforce the 11-digit numeric constraint on phone numbers during profile updates.                                                    |
| REQ-PROFILE-5 | Staff members shall be able to retrieve a list of all registered users.                                                                              |

---

## 5. Other Nonfunctional Requirements

### 5.1 Performance Requirements

| ID         | Requirement                                                                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| REQ-PERF-1 | API responses for read operations (car list, booking list) shall be returned within 500 milliseconds under normal load conditions (up to 100 concurrent users). |
| REQ-PERF-2 | The PostgreSQL connection pool shall maintain a maximum of 5 simultaneous database connections. Connections idle for more than 30 seconds shall be released.    |
| REQ-PERF-3 | The car search endpoint shall support pagination with a maximum of 100 records per page to limit data transfer per request.                                     |
| REQ-PERF-4 | The React frontend shall be delivered as a minified, code-split Vite production build to minimize initial load size.                                            |
| REQ-PERF-5 | Car image assets are hosted on Cloudinary's CDN, offloading static asset delivery from the application server.                                                  |

### 5.2 Safety Requirements

| ID         | Requirement                                                                                                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| REQ-SAFE-1 | Multi-step operations (booking creation, rental approval, rental decline) shall use database transactions with automatic rollback to prevent partial data corruption in the event of a system failure. |
| REQ-SAFE-2 | Row-level locks (`SELECT ... FOR UPDATE`) shall be applied during critical concurrent operations to prevent race conditions when multiple staff members act on the same rental simultaneously.       |
| REQ-SAFE-3 | Car status transitions shall follow the defined state machine. The system shall not allow a car in `rented` or `requested` status to be placed into `maintenance`.                               |

### 5.3 Security Requirements

| ID        | Requirement                                                                                                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| REQ-SEC-1 | All user passwords shall be hashed with bcrypt (minimum 10 salt rounds) before storage. Plaintext passwords shall never be written to the database or logged.                                                   |
| REQ-SEC-2 | All API requests to protected endpoints shall require a valid, unexpired JWT signed with the server's `JWT_SECRET`.                                                                                           |
| REQ-SEC-3 | Staff registration shall require a valid `STAFF_SECRET_KEY` provided via environment variable to prevent unauthorized staff account creation.                                                                 |
| REQ-SEC-4 | All database queries shall use parameterized statements (via the `pg` driver) to prevent SQL injection.                                                                                                       |
| REQ-SEC-5 | Sensitive configuration values (`DB_URL`, `JWT_SECRET`, `STAFF_SECRET_KEY`, Cloudinary credentials) shall be supplied only through environment variables and shall never be committed to version control. |
| REQ-SEC-6 | Role-based access control shall be enforced server-side by middleware on every protected route, independent of any frontend restrictions.                                                                       |
| REQ-SEC-7 | Payment card numbers shall be validated locally using the Luhn algorithm and BIN matching. Card data shall not be transmitted to any external payment processor in version 1.0.                                 |
| REQ-SEC-8 | In production, the CORS policy shall restrict allowed origins to the known frontend domain.                                                                                                                     |

### 5.4 Software Quality Attributes

| Attribute                 | Target                                                                                                                                                                                                                                                         |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Reliability**     | The system shall use database transactions for all multi-table operations to ensure data consistency. Unhandled errors are caught by a global error handler to prevent server crashes.                                                                         |
| **Maintainability** | Backend code shall follow a layered architecture: routes → controllers → models. Each layer has a single responsibility. Frontend code shall use custom hooks (`useFetch`, `useCar`, `useBookings`) to separate data-fetching logic from presentation. |
| **Portability**     | The backend shall run on any OS supporting Node.js 18+. The frontend SPA shall function in all modern browsers.                                                                                                                                                |
| **Usability**       | The UI shall provide inline validation feedback, loading spinners during API calls, and Toast notifications for all action outcomes (success and error).                                                                                                       |
| **Testability**     | The layered backend architecture enables unit testing of models and controllers in isolation. Centralized API client on the frontend enables mock-based component testing.                                                                                     |
| **Scalability**     | The stateless JWT authentication model allows horizontal scaling of the backend without session sharing. Connection pooling prevents database connection exhaustion.                                                                                           |

### 5.5 Business Rules

| ID   | Rule                                                                                                                                  |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------- |
| BR-1 | A customer can have multiple pending or active rentals, but only on cars with distinct `carId` values.                              |
| BR-2 | A car with status `requested`, `rented`, or `maintenance` cannot be booked by a new customer until it returns to `available`. |
| BR-3 | Only staff members may approve, decline, or end rentals. Customers may not self-approve.                                              |
| BR-4 | When a rental is declined, the associated payment is automatically refunded (deleted from the system).                                |
| BR-5 | Staff registration requires possession of the `STAFF_SECRET_KEY`, which is controlled by the system administrator.                  |
| BR-6 | Daily price is the unit of rental cost. Total =`(endDate − startDate)` in calendar days × `carPrice`.                           |
| BR-7 | Car records cannot be updated while associated rentals are in `active` or `requested` status, to preserve booking integrity.      |

---

## 6. Other Requirements

### 6.1 Database Requirements

The system requires a PostgreSQL 13+ database with the following 7 tables initialized from the schema scripts in `backend/src/data/`:

| Table           | Primary Key                | Description                                              |
| --------------- | -------------------------- | -------------------------------------------------------- |
| `users`       | `userId` (SERIAL)        | Core user accounts with role                             |
| `customers`   | `customerId` (SERIAL)    | Customer profile, linked to `users`                    |
| `staff`       | `staffId` (SERIAL)       | Staff profile, linked to `users`                       |
| `cars`        | `carId` (SERIAL)         | Vehicle inventory                                        |
| `maintenance` | `maintenanceId` (SERIAL) | Vehicle maintenance records                              |
| `payments`    | `paymentId` (SERIAL)     | Payment transaction records                              |
| `rentals`     | `bookingId` (SERIAL)     | Rental bookings linking customers, cars, staff, payments |

### 6.2 Internationalization Requirements

Version 1.0 is English-only. No localization or multi-language support is required. Dates are handled in ISO 8601 format (`YYYY-MM-DD`).

### 6.3 Legal Requirements

The system stores driver's license numbers and payment card numbers. In a production deployment, the operator shall ensure compliance with applicable data protection regulations (e.g., GDPR, PCI-DSS). Card numbers must not be transmitted to external processors without appropriate PCI-DSS compliance measures.

---

## Appendix A: Glossary

| Term                          | Definition                                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **SPA**                 | Single-Page Application — a web app that loads once and updates the DOM dynamically without full page reloads.                   |
| **JWT**                 | JSON Web Token — a compact, URL-safe token format used for authentication and claims.                                            |
| **BIN**                 | Bank Identification Number — the first 6 digits of a payment card, used to identify the card issuer/network.                     |
| **Luhn Algorithm**      | A checksum formula (ISO/IEC 7812) used to validate card numbers.                                                                  |
| **Booking / Rental**    | Used interchangeably in this document; refers to a `rentals` database record representing a car rental agreement.               |
| **Fleet**               | The full collection of cars managed by the rental business.                                                                       |
| **bcrypt**              | A password-hashing function based on the Blowfish cipher, designed to be computationally expensive to resist brute-force attacks. |
| **Connection Pool**     | A cache of reusable database connections managed by the application to reduce connection overhead.                                |
| **CORS**                | Cross-Origin Resource Sharing — a browser security mechanism that controls which origins can make requests to the API.           |
| **CDN**                 | Content Delivery Network — a geographically distributed network for fast asset delivery (used by Cloudinary).                    |
| **Parameterized Query** | A database query where user-supplied values are passed as separate parameters, preventing SQL injection.                          |
| **TBD**                 | To Be Determined — a placeholder indicating an incomplete requirement pending further research or decision.                      |

---

## Appendix B: Analysis Models

### B.1 Entity-Relationship Diagram (Logical)

```
┌──────────┐         ┌────────────┐         ┌──────────┐
│  users   │ 1     1 │  customers │ 1     N  │ rentals  │
│──────────│─────────│────────────│──────────│──────────│
│ userId   │         │ customerId │          │ bookingId│
│ username │         │ userId(FK) │          │ customerId(FK)
│ password │         │ name       │          │ userId(FK)
│ role     │         │ phone      │          │ staffId(FK)
└──────────┘         │ license    │          │ carId(FK)│
     │               └────────────┘          │ paymentId(FK)
     │ 1                                     │ startDate│
     │                                       │ endDate  │
     ▼ 1                                     │ total    │
┌──────────┐                                 │ status   │
│  staff   │ 1                     N         └──────────┘
│──────────│──────────────────────────────────────▲
│ staffId  │                                      │ 1
│ userId(FK│                              ┌───────┘
│ name     │                              │
│ phone    │                          ┌───────────┐
└──────────┘                          │ payments  │
                                      │───────────│
┌──────────────┐                      │ paymentId │
│    cars      │                      │ amount    │
│──────────────│                      │ date      │
│ carId        │ 1               N    │ method    │
│ carModel     │──────────────────────│ cardNumber│
│ carYear      │                      └───────────┘
│ carStatus    │
│ carPrice     │ 0..1          1
│ maintenanceId│◄────────────────────┐
│ carImageUrl  │                     │
└──────────────┘              ┌──────────────┐
                              │ maintenance  │
                              │──────────────│
                              │ maintenanceId│
                              │ date         │
                              │ type         │
                              │ cost         │
                              └──────────────┘
```

### B.2 Car Status State Machine

```
         register
            │
            ▼
       ┌─────────┐
       │available│◄────────────────────────────────┐
       └─────────┘                                 │
            │                                      │
    customer books                          rental ends /
            │                              declined + refund
            ▼                                      │
       ┌─────────┐                                 │
       │requested│──── staff approves ────► ┌──────────┐
       └─────────┘                          │  rented  │
            │                               └──────────┘
     staff declines                               │
            │                             staff ends rental
            ▼                                     │
       ┌─────────┐◄────────────────────────────────┘
       │available│
       │         │──── staff schedules ──► ┌─────────────┐
       └─────────┘       maintenance       │ maintenance │
                                           └─────────────┘
                                                 │
                                      maintenance deleted
                                                 │
                                                 ▼
                                           ┌─────────┐
                                           │available│
                                           └─────────┘
```

### B.3 Booking Flow Sequence

```
Customer          Frontend           Backend             Database
   │                  │                  │                   │
   │── select car ───►│                  │                   │
   │── enter dates ──►│                  │                   │
   │                  │── calculate ────►│                   │
   │                  │◄─ total amount ──│                   │
   │── enter card ───►│                  │                   │
   │── submit ────────│                  │                   │
   │                  │── POST /payment ►│                   │
   │                  │                  │── BEGIN TXN ─────►│
   │                  │                  │── validate card   │
   │                  │                  │── INSERT payment ►│
   │                  │                  │── INSERT rental ──►│
   │                  │                  │── UPDATE car ─────►│
   │                  │                  │── COMMIT ─────────►│
   │                  │◄─ booking ID ────│                   │
   │◄─ confirm page ──│                  │                   │
```

---

## Appendix C: To Be Determined List

| #     | TBD                                                      | Section   | Notes                                                                                |
| ----- | -------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------ |
| TBD-1 | End-user manual / in-app onboarding tutorial             | 2.6       | No user-facing help documentation is planned for v1.0.                               |
| TBD-2 | Real payment gateway integration (Stripe, PayPal)        | 4.4       | v1.0 uses local card validation only; no actual charge is processed.                 |
| TBD-3 | Email notification system                                | —        | No email confirmations are sent on booking creation, approval, or decline in v1.0.   |
| TBD-4 | Production CORS origin restriction                       | 3.4 / 5.3 | The exact production frontend domain is not yet determined.                          |
| TBD-5 | PCI-DSS compliance review                                | 6.3       | Required before production deployment if card data is to be stored.                  |
| TBD-6 | Session revocation / token blacklisting                  | 4.1       | JWT tokens cannot be revoked before expiry in v1.0; a token blacklist may be needed. |
| TBD-7 | Maximum number of concurrent active rentals per customer | 5.5       | Business rule not explicitly defined; currently unlimited.                           |
