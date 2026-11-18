# EagleReads Library Management System (BIWA2110)

A full-stack library inventory and borrowing system built with **React**, **Express.js**, and **MySQL**.

## Project Structure
- `frontend/` - React (Vite) user interface with React Router and Fetch API
- `backend/` - Express REST API and MySQL database integration (`schema.sql`)

## Setup Instructions

### 1. Database Setup
1. Open MySQL Workbench or phpMyAdmin.
2. Run the SQL script located in `backend/schema.sql` to create `eaglereads_db` and seed starter data.
3. Update your MySQL password inside `backend/db.js` if required.

### 2. Run the Backend
```bash
cd backend
npm install
node server.js
```
The API server runs on `http://localhost:5000`.

### 3. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
The React app runs on `http://localhost:5173`.

## Test Login Credentials
- **Librarian Account:** Card ID `LIB001` (Select *Librarian*)
- **Client Account:** Card ID `CLI001` (Select *Client*)
