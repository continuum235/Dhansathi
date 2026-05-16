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

- Create a `.env` file in the **backend** folder:
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

- Create a `.env` file in the **frontend** folder:
```env
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-api
VITE_API_URL=/api
```

- Start the frontend:
```bash
npm run dev
```

---

## Docker Setup

Run the frontend and backend locally with Docker:

```bash
docker compose up --build
```

Available services:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

Create a root `.env` file for Docker if you need backend database or AI access:

```env
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-api
MONGODB_URI=your-mongodb-connection-string
GROQ_API_KEY=your-groq-cloud-api-key
```

Notes:
- The frontend container runs the Vite dev server and proxies `/api` to the backend container.
- The backend can start without MongoDB, but tutorial CRUD requires `MONGODB_URI` or `MONGO_URI`.

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
