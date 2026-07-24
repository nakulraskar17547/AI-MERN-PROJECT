# 🚀 GenWeb.ai — AI-Powered Full-Stack Website Builder
[![Vercel Deployment](https://img.shields.io/badge/Frontend-Vercel-black?style=flat-square&logo=vercel)](https://ai-mern-project-liu8.vercel.app/)
[![Render Deployment](https://img.shields.io/badge/Backend-Render-informational?style=flat-square&logo=render)](https://ai-mern-project-1-gfvb.onrender.com)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-forestgreen?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
> **GenWeb.ai** is a modern MERN stack web application that generates production-ready, beautiful, and fully interactive websites from plain text prompts using Advanced AI models. It features a built-in Monaco code editor, live website previews, instant website sharing, credit management, and Stripe integration.
---
## 🌟 Key Features
- 🤖 **AI Website Generator**: Input any text prompt and watch GenWeb.ai craft responsive HTML, CSS, and JavaScript in seconds.
- 💻 **Monaco Code Editor**: Live code editor powered by VS Code's Monaco editor. Tweak, edit, or regenerate code on the fly.
- 👁️ **Live Interactive Preview**: Real-time iframe sandbox preview for instantaneous visual feedback.
- 🔐 **Firebase Google Authentication**: One-click secure sign-in with Google OAuth and JWT-based session security.
- 🚀 **1-Click Site Hosting & Sharing**: Instant deployment of generated projects with shareable live site links.
- 💳 **Stripe Subscription & Credit System**: Tiered pricing plans (Free, Pro, Enterprise) integrated with Stripe Checkout & Webhooks.
- 🎨 **Modern Dark Glassmorphism UI**: Beautiful UI built with React 19, Tailwind CSS v4, and Framer Motion micro-interactions.
---
## 🛠️ Tech Stack
### **Frontend**
- **Framework**: React 19 + Vite
- **State Management**: Redux Toolkit & React-Redux
- **Code Editor**: `@monaco-editor/react`
- **Styling**: Tailwind CSS v4 & Lucide Icons
- **Animations**: Framer Motion (`motion/react`)
- **Auth Client**: Firebase Auth (Google OAuth)
- **HTTP Client**: Axios
### **Backend**
- **Runtime**: Node.js & Express.js (ES Modules)
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: OpenRouter API
- **Payments**: Stripe API & Webhook Controller
- **Authentication**: JSON Web Tokens (JWT) & Cookie Parser
---
## 📁 Project Structure
```text
1.websiteBuilder/
├── client/                      # React Frontend Application
│   ├── public/                  # Static Assets
│   ├── src/
│   │   ├── assets/              # Logos & media assets
│   │   ├── components/          # Reusable components (LoginModal, Navbar, etc.)
│   │   ├── hooks/               # Custom hooks (useGetCurrentUser, etc.)
│   │   ├── pages/               # App views (Home, Dashboard, Generate, Editor, Livesite, Pricing)
│   │   ├── redux/               # Redux slices & store configuration
│   │   ├── App.jsx              # Main routing & global providers
│   │   ├── firebase.js          # Firebase SDK client setup
│   │   └── main.jsx             # React entry point
│   ├── .env.production          # Production environment variables
│   ├── vercel.json              # Vercel SPA rewrite rules
│   └── package.json
│
└── server/                      # Node.js Express Backend API
    ├── config/                  # Database connection (MongoDB)
    ├── controllers/             # Business logic (Auth, User, Website, Billing, Stripe Webhooks)
    ├── middlewares/             # Auth JWT middleware
    ├── models/                  # Mongoose Schemas (User, Website)
    ├── routes/                  # API endpoints definition
    ├── index.js                 # Express application server entry point
    └── package.json
```
---
## ⚙️ Environment Variables
To run this project locally or deploy it to production, set up the following environment variables:
### **Client Environment Variables** (`client/.env`)
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_API_URL=http://localhost:8000
```
### **Server Environment Variables** (`server/.env`)
```env
PORT=8000
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/GENWEBAI?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```
---
## 🚀 Quick Start (Local Setup)
### **Prerequisites**
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or MongoDB Atlas)
- Git
### **1. Clone the Repository**
```bash
git clone https://github.com/nakulraskar17547/AI-MERN-PROJECT.git
cd AI-MERN-PROJECT/1.websiteBuilder
```
### **2. Setup Server**
```bash
cd server
npm install
# Create .env file with your credentials
npm run dev
```
> Server runs on `http://localhost:8000`
### **3. Setup Client**
Open a new terminal:
```bash
cd client
npm install
# Create .env file with your credentials
npm run dev
```
> Client runs on `http://localhost:5173`
---
## 🌐 Live Deployment Links
- **Frontend Application**: [https://ai-mern-project-liu8.vercel.app](https://ai-mern-project-liu8.vercel.app)
- **Backend API**: [https://ai-mern-project-1-gfvb.onrender.com](https://ai-mern-project-1-gfvb.onrender.com)
---
## 📜 License
Distributed under the ISC License. See `LICENSE` for more information.
---
Made with ❤️ by [Nakul Raskar](https://github.com/nakulraskar17547)
