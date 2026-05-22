# 🩺 DocAppoint — Server

**API Base URL:** `https://docappoint-server.onrender.com/api`

DocAppoint Server is the REST API backend powering the [DocAppoint](https://doc-appoint-client-side.vercel.app) doctor appointment booking platform. Built with Node.js and Express, it handles authentication, doctor listings, appointment management, and patient reviews — all backed by MongoDB Atlas.

---

## ✨ Key Features

- 🔐 **Auth Endpoints** — Supports email/password and Google OAuth via Better Auth. Issues JWT sessions stored in HttpOnly cookies.
- 📅 **Appointment Management** — Full CRUD for bookings: create, view, reschedule, and cancel.
- 👨‍⚕️ **Doctor Listings** — Serves BMDC-verified doctor data with filtering by specialty, availability, and location.
- ⭐ **Reviews API** — Stores and retrieves verified patient reviews linked to completed appointments.
- 🔒 **Protected Routes** — JWT middleware guards all sensitive endpoints. Only authenticated users can access their own data.
- 🌐 **CORS Configured** — Whitelisted for the Vercel client origin.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Database | MongoDB Atlas (via Mongoose) |
| Auth | Better Auth (JWT via HttpOnly cookies) |
| Deployment | Render |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Google OAuth credentials
- The [DocAppoint Client](https://github.com/fahid2002/DocAppoint-Client-Side) running on `localhost:3000`

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/fahid2002/DocAppoint-Server.git
cd DocAppoint-Server

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
```

Fill in `.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
BETTER_AUTH_SECRET=your_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:3000
```

```bash
# 4. Start the development server
npm run dev
```

API will be running at `http://localhost:5000/api`.

---

## 📁 Project Structure

```
src/
├── routes/           # Express route definitions
│   ├── auth.routes.js
│   ├── doctors.routes.js
│   ├── appointments.routes.js
│   └── reviews.routes.js
├── controllers/      # Route handler logic
├── models/           # Mongoose schemas
│   ├── User.js
│   ├── Doctor.js
│   ├── Appointment.js
│   └── Review.js
├── middleware/       # JWT auth, error handling
└── index.js          # App entry point
```

---

## 🌐 Deployment (Render)

1. Push server code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set **Build Command:** `npm install`
4. Set **Start Command:** `npm start`
5. Add all environment variables under **Environment**
6. Deploy

---

## 📄 License

Built for educational purposes. No commercial license is granted.

---

© 2026 DocAppoint — Designed & developed by **Fahid Hasan Khan**. All rights reserved.
