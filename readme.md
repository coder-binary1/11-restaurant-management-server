# 🍽️ Restaurant Management Website - Server

This is the **backend** of the Restaurant Management Website, developed using **Node.js**, **Express.js**, and **MongoDB**. It provides secure and scalable RESTful APIs for user authentication, food management, and order processing with full JWT-based route protection.

---

## 🌍 Live API Base URL

`https://11-restaurant-management-server.vercel.app/`

---

## ⚙️ Key Features

- ✅ MongoDB integration using Mongoose
- ✅ JWT Authentication & Authorization
- ✅ Protected API routes
- ✅ CRUD functionality for foods
- ✅ Order creation & management
- ✅ Food search & pagination
- ✅ Quantity and owner validation
- ✅ Environment variable configuration
- ✅ CORS-enabled

---

## 📦 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (jsonwebtoken)**
- **dotenv**
- **CORS**
- **cookie-parser**
- **bcryptjs** _(optional for password hashing)_

---

# 🧩 API Endpoints

### 🔑 Auth

| Method | Endpoint | Description             |
| ------ | -------- | ----------------------- |
| POST   | `/jwt`   | Create and return a JWT |

---

### 🍲 Foods

| Method | Endpoint           | Description                                     |
| ------ | ------------------ | ----------------------------------------------- |
| GET    | `/allFoods`        | Get all foods (with limit, search & pagination) |
| GET    | `/allFoods?email=` | Get specific user's added foods                 |
| GET    | `/allFood/:id`     | Get single food item details                    |
| POST   | `/allFoods`        | Add a new food item (Private)                   |
| PUT    | `/allFood/:id`     | Update food info (Private, Owner only)          |
| DELETE | `/foods/:id`       | Delete a food item (Private, Owner only)        |

---

### 🛒 Orders

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/orders`        | Place an order (Private)    |
| GET    | `/orders?email=` | Get user's orders (Private) |
| DELETE | `/orders/:id`    | Delete an order (Private)   |

---

## 🗂 Folder Structure

```bash
server/
├── .env               # Environment variables
├── index.js           # Server entry point
├── readme.md          # Readme file

---
```

## ▶️ Getting Started

### Clone the Repository

```bash
git clone https://github.com/coder-binary1/11-restaurant-management-server
cd 11-restaurant-management-server

```

## 📦 Install Dependencies

````bash
npm install

## ⚙️ Create a `.env` File

Create a `.env` file in the root directory and configure it with your environment variables. Example:

```env
DB_USER=<database username>
DB_PASS=<databasr password>
ACCESS_TOKEN_SECRET=<generate secret key>
````

## 🚀 Run the Server

```bash
node index.js
```

The server will start at:  
👉 `http://localhost:5000`

---

## 🔐 Security Notes

- All credentials are secured using `.env`
- JWT is required for accessing private routes
- Routes are protected using middleware

---

## 🧾 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT)
