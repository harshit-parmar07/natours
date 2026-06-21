# Natours - Tour Booking Application

![Live Demo](https://img.shields.io/badge/Live_Demo-Available-success?style=for-the-badge&logo=vercel)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)

**Live Application:** [natours-react-v1.vercel.app](https://natours-react-v1.vercel.app/)

---

## Overview

Natours is a full-stack, production-ready tour booking application featuring a decoupled MERN architecture. Originally engineered with server-side rendered (SSR) Pug templates, the frontend was completely migrated to a client-side rendered (CSR) React Single Page Application (SPA). This migration optimized application performance, established strict separation of concerns, and enhanced user experience through asynchronous state management and fluid UI transitions. The backend operates as a stateless, secure RESTful API handling complex data modeling, geospatial queries, authentication, and payment workflows.

---

## Key Features

* **Decoupled RESTful API:** Complete CRUD endpoints for tours, users, reviews, and bookings, systematically consumed by the React client via asynchronous HTTP requests.
* **SPA Authentication & Authorization:** State persistence managed securely via JSON Web Tokens (JWT) transmitted through HTTP-only cross-origin cookies. Role-based access control (admin, lead-guide, guide, user) is strictly enforced on both client-side routes and backend endpoints.
* **Advanced Database Architecture:** Schema design optimized using MongoDB and Mongoose, leveraging pre/post save and query middleware, custom data validation, complex aggregation pipelines, and geospatial indexing for radius-based search queries.
* **Enterprise Security Guardrails:** API layer protected against common vulnerabilities using NoSQL injection prevention, data sanitization, XSS filtering, strict rate-limiting, HTTP Parameter Pollution (HPP) prevention, and secure HTTP headers via Helmet.
* **Transactional Payment Infrastructure:** End-to-end checkout pipeline integrated with the Stripe API, utilizing automated webhooks to process asynchronous payment verification and booking creation.
* **Automated Notification Workflows:** Transactional email architecture built using Nodemailer to handle automated welcome systems and secure password-reset lifecycles.

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Frontend:** React, React Router, Axios, HTML5, CSS3
* **Security & Utility:** bcryptjs, jsonwebtoken, helmet, express-mongo-sanitize, xss-clean, express-rate-limit

---

## Repository Structure

```text
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── app.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.js
│   └── package.json
└── package.json
```

---

## Local Setup & Installation

Ensure you have Node.js and a MongoDB instance accessible before initiating setup.

### 1. Clone the Repository
```bash
git clone [https://github.com/harshit-parmar07/natours.git](https://github.com/harshit-parmar07/natours.git)
cd natours
```

### 2. Install Project Dependencies
```bash
npm run install-all
```

### 3. Configure Environment Variables
Create a `config.env` file in the root directory and populate it with active credentials.

```env
NODE_ENV=development
PORT=3000
DATABASE=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.mongodb.net/natours?retryWrites=true
DATABASE_PASSWORD=your_mongodb_password
JWT_SECRET=your_ultra_secure_and_long_random_jwt_secret_key
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=your_email_service_username
EMAIL_PASSWORD=your_email_service_password
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_FROM=hello@natours.io
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### 4. Seed Database Core Data
```bash
node backend/dev-data/data/import-dev-data.js --import
```

### 5. Execute the Development Server
```bash
npm run dev
```

---

## Architectural Evolution: Pug to React Migration

In an interview setting, the shift from a coupled MVC pattern to a decoupled client-server architecture reflects an understanding of modern enterprise scaling standards.

| Architectural Metric | Monolithic (Pug Templates) | Decoupled (React SPA) |
| :--- | :--- | :--- |
| **Rendering Strategy** | Server-Side Rendering (SSR) | Client-Side Rendering (CSR) |
| **Network Overhead** | Heavy; raw HTML pages re-sent per route change | Light; data exchanged purely via JSON payloads |
| **State Management** | State persisted on server sessions or database re-fetches | Managed on client runtime, optimizing UI component responsiveness |
| **Separation of Concerns** | View layer highly dependent on backend routing controller logic | Backend functions as a pure data service; frontend handles UI layout independently |
