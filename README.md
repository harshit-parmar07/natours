# Natours - Tour Booking Application

![Live Demo](https://img.shields.io/badge/Live_Demo-Available-success?style=for-the-badge&logo=render)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

**Live Application:** [natours-app-ew6y.onrender.com](https://natours-app-ew6y.onrender.com/)

## 🚀 Overview

Natours is a robust, full-stack web application designed for browsing, reviewing, and booking nature tours. Built entirely from scratch, it features a comprehensive RESTful API backend seamlessly integrated with a Server-Side Rendered (SSR) frontend. The system handles complex data modeling, secure user authentication, geospatial queries, and automated email services.

## ✨ Key Features

* **Advanced RESTful API:** Complete CRUD operations for tours, users, reviews, and bookings.
* **Authentication & Authorization:** Secure login system using JSON Web Tokens (JWT) and cookies, with roles (admin, lead-guide, guide, user) to protect routes.
* **Database Management:** MongoDB via Mongoose, utilizing advanced features like data validation, middleware, aggregation pipelines, and geospatial queries to find tours within a certain radius.
* **Security Guardrails:** Implementation of NoSQL injection prevention, Data Sanitization, XSS protection, Rate Limiting, HTTP Parameter Pollution prevention, and secure HTTP headers (Helmet).
* **Server-Side Rendering:** Dynamic and highly performant front-end interface built with Pug templates.
* **Payment Integration:** Secure checkout and payment processing for tour bookings using the **Stripe API**.
* **Email Integration:** Automated password resets and welcome emails using Nodemailer.

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Frontend:** Pug (Template Engine), HTML5, CSS3, vanilla JavaScript
* **Security & Auth:** bcryptjs, jsonwebtoken, helmet, express-mongo-sanitize, xss-clean, express-rate-limit

## ⚙️ Local Setup & Installation

To run this project locally, you will need **Node.js** and a **MongoDB** database (either local or MongoDB Atlas) installed on your machine.

### 1. Clone the repository
```bash
git clone [https://github.com/harshit-parmar07/natours.git](https://github.com/harshit-parmar07/natours.git)
cd natours
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a file named `config.env` in the root directory of the project and add the following keys. You will need to fill in your own credentials for the database, JWT, and email services.

```env
NODE_ENV=development
PORT=3000

# Database
DATABASE=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.mongodb.net/natours?retryWrites=true
DATABASE_PASSWORD=your_mongodb_password

# JWT (JSON Web Token) Auth
JWT_SECRET=your_ultra_secure_and_long_random_jwt_secret_key
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Email Configuration (e.g., Mailtrap for testing, SendGrid for production)
EMAIL_USERNAME=your_email_service_username
EMAIL_PASSWORD=your_email_service_password
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_FROM=hello@natours.io

# Stripe Payments 
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### 4. Import Development Data (Optional)
If you want to populate the database with sample tours, users, and reviews to test the application, run:
```bash
node dev-data/data/import-dev-data.js --import
```

### 5. Start the Server
```bash
# For development with auto-restart (requires nodemon)
npm run start:dev

# For production
npm start
```

Your server should now be running on `http://localhost:3000`.

## 🤝 Architecture Note
This project utilizes an **MVC (Model-View-Controller)** architecture, ensuring a clean separation of concerns. Controllers handle application logic, Models dictate database schema and business logic, and Views manage the server-side UI rendering.
