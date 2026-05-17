# Dhansathi 
**Financial Empowerment Platform for Women in Rural Areas**

Dhansathi is a MERN stack project focused on **financial literacy and empowerment** for women in rural communities.  
It provides easy-to-use tools and resources to help manage money, track expenses, and learn about financial independence.  
The project emphasizes accessibility and security, ensuring users can safely engage with financial tools and resources.

---

## Features
- **Tutorials Page** – Learn about budgeting, savings, and financial independence.  
- **Chatbot** – AI-powered assistant integrated with **Groq Cloud API** to guide users with queries in simple language.  
- **Budget Planner** – Helps track income, expenses, and savings goals.  
- **Authentication** – Secure user login/signup with **Clerk**.   

---

## Tech Stack
- **Frontend:** React (with Clerk authentication)  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (for CRUD operations)  
- **Auth:** Clerk  
- **AI Chatbot:** Groq Cloud API  

---

## Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/Tanish-235/Dhansathi.git
cd Dhansathi
```

---

### Backend Setup
```bash
cd backend
npm install
```

- Copy `.env.example` to `.env` in the **backend** folder:
```bash
cp .env.example .env
```

- Backend environment variables:
```env
MONGODB_URI=your-mongodb-connection-string
PORT=5000
GROQ_API_KEY=your-groq-cloud-api-key
```

- Start the backend server:
```bash
npm start
```

---

### Frontend Setup
```bash
cd frontend
npm install
```

- Copy `.env.example` to `.env` in the **frontend** folder:
```bash
cp .env.example .env
```

- Frontend environment variables:
```env
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
VITE_API_URL=/api
```

- For local development, `VITE_API_URL=/api` works with the Vite proxy.
- For production, set `VITE_API_URL` to your deployed backend origin, for example:
```env
VITE_API_URL=https://dhansathi-api.onrender.com/api
```
- If frontend and backend are deployed on different domains, using `/api` in production will send requests to the frontend domain and return `404`.

- Start the frontend:
```bash
npm run dev
```

---

## Deployment

- Frontend example on Vercel: `https://dhansathi.vercel.app`
- Backend example on Render: `https://dhansathi-api.onrender.com`
- Set frontend `VITE_API_URL` on Vercel to `https://dhansathi-api.onrender.com/api`
- Add `https://dhansathi.vercel.app` to your allowed frontend origins in the backend CORS config
- In Clerk, add your Vercel domain as an allowed production domain and use the production publishable key

### Vercel
- Dashboard: https://vercel.com/
- Project env for frontend:
```env
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
VITE_API_URL=https://dhansathi-api.onrender.com/api
```

### Render
- Dashboard: https://render.com/
- Project env for backend:
```env
MONGODB_URI=your-mongodb-connection-string
PORT=5000
GROQ_API_KEY=your-groq-cloud-api-key
```

---

## Contributing
Contributions are welcome! Feel free to fork this repo, open issues, or submit PRs.  

---

## Acknowledgements
- [Clerk](https://clerk.com/) for authentication  
- [MongoDB](https://www.mongodb.com/) for database services  
- [Groq](https://groq.com/) for chatbot integration  
- All open-source contributors who made this project possible  

---
