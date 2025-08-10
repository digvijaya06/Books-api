# 📚 Books API

A **Professional REST API for Books** built with **Node.js**, **Express**, and **Swagger** for interactive API documentation.

## 🚀 Features
- CRUD operations for books 📖
- Swagger UI documentation
- Organized MVC structure
- Environment variables support with `.env`

## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **Swagger (OpenAPI 3.0)**
- **JavaScript**

## 📂 Project Structure
📦 Books-API
┣ 📂 controllers # API logic
┣ 📂 data # Sample data
┣ 📂 routes # API routes
┣ 📜 index.js # Server entry point
┣ 📜 .env # Environment variables
┣ 📜 package.json # Dependencies & scripts
┗ 📜 README.md # Project documentation

## 📄 API Endpoints

| Method | Endpoint      | Description       |
|--------|--------------|-------------------|
| GET    | `/books`     | Get all books     |
| GET    | `/books/:id` | Get book by ID    |
| POST   | `/books`     | Add a new book    |
| PUT    | `/books/:id` | Update a book     |
| DELETE | `/books/:id` | Delete a book     |

## 📜 API Documentation
Swagger UI is available at:  
http://localhost:3000/api-docs

## ⚙️ Setup Instructions
1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/Books-api.git
   cd Books-api
   npm install
   PORT=3000
   npm start


