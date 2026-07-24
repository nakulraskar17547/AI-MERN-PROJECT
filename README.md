# GenWeb.ai - AI-Powered Website Builder

A full-stack MERN application that generates professional, responsive websites using AI. Users can create, customize, and deploy websites with natural language prompts.

🔗 **Live Demo**: [https://ai-mern-project-liu8.vercel.app/](https://ai-mern-project-liu8.vercel.app/)

## Features

- **AI Website Generation** - Generate complete, responsive websites from text descriptions
- **Real-time Editor** - Live preview and code editing with Monaco Editor
- **AI-Powered Updates** - Modify websites using natural language commands
- **User Authentication** - Secure login with Google OAuth via Firebase
- **Credit System** - Pay-per-use model with Stripe integration
- **Public Sharing** - Share deployed websites with anyone via public links
- **Responsive Design** - All generated websites work on mobile, tablet, and desktop
- **Dashboard** - Manage all your generated websites in one place

## Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Monaco Editor (VS Code editor)
- Framer Motion (animations)
- Axios
- React Router
- Redux Toolkit

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Firebase Admin (authentication)
- Stripe (payments)
- OpenRouter API (AI generation)

## Project Structure

```
AI-MERN-PROJECT/
├── 1.websiteBuilder/
│   ├── client/              # React frontend
│   │   ├── src/
│   │   │   ├── pages/       # Page components
│   │   │   ├── components/  # Reusable components
│   │   │   ├── hooks/       # Custom hooks
│   │   │   ├── redux/       # State management
│   │   │   └── firebase.js  # Firebase config
│   │   └── package.json
│   │
│   └── server/              # Express backend
│       ├── controllers/     # Route handlers
│       ├── models/          # MongoDB schemas
│       ├── routes/          # API routes
│       ├── middlewares/     # Auth & validation
│       ├── config/          # DB & API configs
│       ├── utils/           # Helper functions
│       └── package.json
```

## Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Firebase project
- Stripe account
- OpenRouter API key

### Environment Variables

#### Server (`.env` in `1.websiteBuilder/server/`)
```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

#### Client (`.env` in `1.websiteBuilder/client/`)
```env
VITE_API_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/nakulraskar17547/AI-MERN-PROJECT.git
cd AI-MERN-PROJECT
```

2. **Install server dependencies**
```bash
cd 1.websiteBuilder/server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Set up environment variables**
   - Create `.env` files in both server and client directories
   - Add all required environment variables

5. **Start the development servers**

Terminal 1 (Backend):
```bash
cd 1.websiteBuilder/server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd 1.websiteBuilder/client
npm run dev
```

6. **Access the application**
   - Open http://localhost:5173 in your browser
   - Backend API runs on http://localhost:8000

## Deployment

### Backend (Render)
1. Connect your GitHub repository
2. Set root directory to `1.websiteBuilder/server`
3. Add environment variables in Render dashboard
4. Deploy

### Frontend (Vercel)
1. Connect your GitHub repository
2. Set root directory to `1.websiteBuilder/client`
3. Set framework preset to Vite
4. Add environment variables:
   - `VITE_API_URL`
   - `VITE_FIREBASE_API_KEY`
5. Deploy

## API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/logout` - Logout user

### User
- `GET /api/user/me` - Get current user info

### Website
- `POST /api/website/generate` - Generate new website (50 credits)
- `POST /api/website/update/:id` - Update website (25 credits)
- `GET /api/website/get-by-id/:id` - Get website (authenticated)
- `GET /api/website/public/:id` - Get deployed website (public)
- `GET /api/website/get-all` - Get all user websites
- `POST /api/website/mark-deployed/:id` - Mark website as deployed

### Billing
- `POST /api/billing` - Create Stripe checkout session
- `POST /api/billing/verify` - Verify payment and add credits
- `POST /api/billing/webhook` - Stripe webhook handler

## Credits System

- **Free Plan**: 100 credits (₹0)
- **Pro Plan**: 500 credits (₹499)
- **Enterprise Plan**: 1000 credits (₹1499)

Usage:
- Generate website: 50 credits
- Update website: 25 credits

## Key Features Explanation

### AI Website Generation
Uses OpenRouter API with DeepSeek model to generate complete HTML/CSS/JavaScript websites based on user prompts. All websites are:
- Fully responsive (mobile, tablet, desktop)
- Single-page applications with smooth navigation
- Production-ready with no placeholders
- Styled with modern UI/UX principles

### Live Editor
Built with Monaco Editor (same as VS Code), allows:
- Real-time code editing
- Live preview in iframe
- Syntax highlighting
- Dark theme

### Public Sharing
Deployed websites can be shared via public URLs without requiring authentication. Only websites marked as "deployed" are publicly accessible.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

## Contact

Nakul Raskar - [GitHub](https://github.com/nakulraskar17547)

## Acknowledgments

- OpenRouter for AI API
- Firebase for authentication
- Stripe for payment processing
- Render & Vercel for hosting
