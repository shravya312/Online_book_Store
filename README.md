# Online Book Store

A full-stack online book store application built with React (TypeScript), Express.js, and MongoDB.

## Features

- 📚 Book Management (CRUD operations)
- 🔍 Search and filter books
- 📱 Responsive design
- 🎨 Modern UI/UX
- 🔒 Type-safe with TypeScript

## Project Structure

```
Online_book_Store/
├── backend/              # Express.js backend
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   └── server.ts     # Server entry point
│   └── package.json
│
└── online_book_store_app/  # React frontend
    ├── src/
    │   ├── components/   # React components
    │   ├── services/     # API services
    │   ├── types/        # TypeScript types
    │   └── App.tsx
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or pnpm

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/online_book_store
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
# Make sure MongoDB is running on your system
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd online_book_store_app
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional, defaults to localhost:5000):
```bash
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or similar)

## API Endpoints

- `GET /api/books` - Get all books (with optional query params: category, search, page, limit)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `GET /api/health` - Health check

## Technologies Used

### Frontend
- React 19
- TypeScript
- Vite
- CSS3

### Backend
- Express.js
- MongoDB (Mongoose)
- TypeScript
- CORS

## License

Apache License 2.0
