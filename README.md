# Job Application Tracker

## Overview

A full-stack web application to track job applications with status updates and notes.

**Live App →** [job-tracker-app-iota-three.vercel.app](https://job-tracker-app-iota-three.vercel.app/)

> Register a free account to explore all features

## Tech Stack

| Layer    | Technology                                |
| -------- | ----------------------------------------- |
| Backend  | Java 17, Spring Boot 3.2, Spring Security |
| Database | PostgreSQL, Spring Data JPA               |
| Auth     | JWT (JSON Web Tokens)                     |
| Frontend | React 19, Vite, Tailwind CSS              |
| API Docs | Swagger / OpenAPI                         |

---

##  Features

- JWT-based user registration and login
- Create, edit, delete job applications
- Track status — Applied → Shortlisted → Interview → Offer → Rejected
- Add notes to each application
- Dashboard with status summary counts

---

## Project Structure

```
job-tracker/
├── backend/
│   └── job-tracker-backend/
│       ├── src/main/java/com/jobtracker/
│       │   ├── auth/         # Authentication module
│       │   ├── user/         # User management
│       │   ├── application/  # Job applications
│       │   ├── note/         # Application notes
│       │   └── common/       # Shared configs, security, exceptions
│       └── pom.xml
└── frontend/
    └── job-tracker-frontend/
        ├── src/
        │   ├── components/   # Reusable UI components
        │   ├── pages/        # Page components
        │   ├── services/     # API service layer
        │   └── utils/        # Utility functions
        └── package.json
```

---

## Local Setup

### Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL
- Maven

---

### 1. Database

```sql
CREATE DATABASE job_tracker_db;
```

---

### 2. Backend

```bash
cd backend/job-tracker-backend
```

Edit `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/job_tracker_db
    username: your_postgres_username
    password: your_postgres_password

jwt:
  secret: 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
  expiration: 86400000
```

Run:

```bash
./mvnw spring-boot:run
```

Backend runs at → `http://localhost:8080`

---

### 3. Frontend

```bash
cd frontend/job-tracker-frontend
npm install
npm run dev
```

Frontend runs at → `http://localhost:5173`

---

##  API Endpoints

### Auth — Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login, returns JWT token |

### Applications — Requires JWT

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/applications` | Get all your applications |
| GET | `/applications/{id}` | Get one application |
| POST | `/applications` | Create application |
| PUT | `/applications/{id}` | Update application |
| DELETE | `/applications/{id}` | Delete application |

### Notes — Requires JWT

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/applications/{id}/notes` | Get all notes |
| POST | `/applications/{id}/notes` | Add a note |

---

##  API Documentation (Swagger)

Open → `http://localhost:8080/swagger-ui.html`

**To authenticate in Swagger:**

1. Call `/auth/login` → copy the token
2. Click **Authorize** button
3. Enter → `Bearer your_token_here`

---

##  How Authentication Works

```
User Login → JWT Token → Sent in every request header → Backend validates → Access granted
```

Token is stored in `localStorage` on the frontend and attached to every API call automatically.

---

## What I Learned

**Backend Architecture**
- Modular monolith — organizing code by feature, not by layer
- Layered flow — Controller → Service → Repository
- DTO pattern with MapStruct — never expose entities directly
- JWT authentication — stateless security with Spring Security
- Global exception handling — clean, consistent error responses
- Swagger — self-documenting API

**Frontend Architecture**
- Component-based design — reusable, single-purpose components
- Centralized API layer — all HTTP calls in one place
- Protected routes — auth guards for secure pages
- Loading & error states — better user experience
- Axios interceptors — auto-attach tokens, handle 401 globally
