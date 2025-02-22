# Uber Microservices with Captain, Ride, and User Servers

This project is a microservices-based Uber clone with separate services for user management, ride handling, and captain operations. The services communicate using RabbitMQ for asynchronous messaging.

## Features

- **User Service:** Registration, login, logout, profile management, and ride acceptance.
- **Captain Service:** Registration, login, logout, profile management, availability toggle, and ride handling.
- **Ride Service:** Ride creation and acceptance.
- **Authentication:** JWT-based authentication for secure API endpoints.
- **Asynchronous Communication:** Uses RabbitMQ (`amqplib`) for message passing between services.

## Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT & Bcrypt
- **Message Queue:** RabbitMQ (`amqplib`)
- **HTTP Requests:** Axios (only in Ride Service)
- **Environment Management:** Dotenv

---

## Microservices Overview

### **1. Captain Service** (`/captain`)

Handles captain-related actions such as registration, authentication, and ride availability.

#### Endpoints:

- `POST /register` - Register a new captain
- `POST /login` - Login captain
- `GET /logout` - Logout captain
- `GET /profile` - View captain profile (Authenticated)
- `PATCH /toggle-availability` - Toggle captain availability (Authenticated)
- `GET /new-ride` - Listen for new ride requests (Authenticated)

#### Dependencies:

```json
"amqplib": "^0.10.5",
"bcrypt": "^5.1.1",
"cookie-parser": "^1.4.7",
"dotenv": "^16.4.7",
"express": "^4.21.2",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.10.0",
"morgan": "^1.10.0"
```

---

### **2. User Service** (`/user`)

Manages user authentication, profiles, and accepted rides.

#### Endpoints:

- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /logout` - Logout user
- `GET /profile` - View user profile (Authenticated)
- `GET /accepted-ride` - Fetch accepted rides (Authenticated)

#### Dependencies:

```json
"amqplib": "^0.10.5",
"bcrypt": "^5.1.1",
"cookie-parser": "^1.4.7",
"dotenv": "^16.4.7",
"express": "^4.21.2",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.10.1"
```

---

### **3. Ride Service** (`/ride`)

Handles ride creation and acceptance.

#### Endpoints:

- `POST /create-ride` - Create a new ride (User Authenticated)
- `POST /accept-ride` - Accept a ride (Captain Authenticated)

#### Dependencies:

```json
"amqplib": "^0.10.5",
"axios": "^1.7.9",
"bcrypt": "^5.1.1",
"cookie-parser": "^1.4.7",
"dotenv": "^16.4.7",
"express": "^4.21.2",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.10.1"
```

---

## Installation & Setup

### **Prerequisites:**

- Node.js (>=14.x)
- MongoDB (running locally or via cloud)
- RabbitMQ (for message queueing)

### **Steps to Run Locally**

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/uber-microservices.git
   cd uber-microservices
   ```
2. Install dependencies for each service:
   ```sh
   cd captain && npm install
   cd ../user && npm install
   cd ../ride && npm install
   ```
3. Create `.env` files for each service:
   - Example:
     ```env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/uber_service
     JWT_SECRET=your_jwt_secret
     RABBITMQ_URL=amqp://localhost
     ```
4. Start MongoDB and RabbitMQ.
5. Run each service:
   ```sh
   cd captain && npm start
   cd ../user && npm start
   cd ../ride && npm start
   ```

---

## API Authentication

- Uses **JWT (JSON Web Tokens)** for secure API access.
- Include `Authorization: Bearer <token>` in headers for protected routes.

---

## Future Improvements

- Implement WebSockets for real-time ride updates
- Add payment integration (Stripe, PayPal, etc.)
- Enhance logging and monitoring

---

## License

This project is licensed under the **MIT License**.
