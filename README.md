# Placerly Finance - Wealth Management System

Placerly is a full-stack finance management platform that allows users to manage assets, accounts, and transitions with a modern UI for clients and a secure admin panel for administrators.

---

## 🚀 Live URLs

- **Client Website** → [https://placerly.vercel.app/](https://placerly.vercel.app/)
- **Admin Panel** → [https://placerly.onrender.com/](https://placerly.onrender.com/)
- **Finance Console Dashboard** → [https://placerly-1.onrender.com/](https://placerly-1.onrender.com/)

---

## 🧪 Dummy Admin Access

You can try out the **Admin Panel** using these credentials:

- **Email**: `quadeyaunifre-8075@yopmail.com`
- **Password**: `abcdefg123`

You can try out the **Finance Console Dashboard** using these credentials:

- **Email**: `wenejeippemo-7240@yopmail.com`
- **Password**: `abcdefg123`

---

## 🛠️ Tech Stack

### Frontend

- **Next.js** (App Router) – React framework for SSR/SSG
- **TanStack Query (React Query)** – API fetching & caching
- **Zustand** – lightweight state management
- **Tailwind CSS** – utility-first styling
- **Bootstrap** – rapid component prototyping

### Backend

- **Node.js + Express** – REST API server
- **MongoDB** – NoSQL database for persistence
- **EJS** – templating for server-side rendered admin views

### Authentication & Security

- **JWT (JSON Web Token)** – stateless authentication
- **cookie-parser** – handling cookies
- **express-session** – session management
- **Joi** – schema validation for API payloads

---

## 📂 Project Structure

```
/client     → Next.js frontend
/server     → Node.js + Express backend
/models     → MongoDB Mongoose schemas
/routes     → Express API routes
/views      → EJS templates for admin panel
```

---

## ✨ Features

- 🔑 **User Authentication** (JWT + Cookies + Sessions)
- 👤 **Role-based Access** (Admin vs Client)
- 💰 **Assets Management** (Cash, Stocks & Investments)
- 📊 **Finance Console Dashboard**
- ✅ **Form Validation with Joi**
- 🎨 **Responsive UI with Tailwind & Bootstrap**
- ⚡ **API Integration with React Query**

---

## ⚡ Getting Started (Local Setup)

1. **Clone the repository**

   ```bash
   git clone https://github.com/franklyngomes/Placerly.git
   cd placerly
   ```

2. **Setup environment variables**

   Create `.env` in the server folder:

   ```env
   PORT=5000
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   SESSION_SECRET=your-session-secret
   ```

3. **Install dependencies**

   ```bash
   # Client
   cd client
   npm install

   # In placerly
   cd placerly
   npm install

   # Server
   cd ../server
   npm install
   ```

4. **Run the project**

   ```bash
   # In client
   npm run dev

   # In placerly
   npm run dev

   # In server
   npm start
   ```

---

## 👨‍💻 Author

Built by **Franklyn Gomes** 🚀
