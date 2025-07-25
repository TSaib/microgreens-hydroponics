# Microgreens Ecommerce Project

- **backend/**: Spring Boot (Java), PostgreSQL, JWT Auth, INR currency
- **frontend/**: React (Vite), INR currency, lovable.dev-inspired UI

---

## Backend Setup

1. **Prerequisites:**  
   - Java 17+  
   - Maven  
   - PostgreSQL

2. **Configure Database:**  
   - Create a PostgreSQL database (e.g., `microgreens_db`).
   - Edit `backend/src/main/resources/application.properties` with your DB credentials.

3. **Run Backend Locally:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   - API runs at `http://localhost:8080`

---

## Frontend Setup

1. **Prerequisites:**  
   - Node.js 18+
   - npm or yarn

2. **Run Frontend Locally:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   - App runs at `http://localhost:5173`

---

## Connecting Frontend & Backend

- Set your backend API URL in `frontend/src/config.js` (e.g., `http://localhost:8080/api`)
- For production, update this URL to point to your Render backend.

---

## Deploy

- **Backend:** Deploy to Render (root: `/backend`)
- **Frontend:** Deploy to Vercel (root: `/frontend`)

---