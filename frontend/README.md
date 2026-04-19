# Crypto Trading API Dashboard

## 🚀 Project Overview
This project is a simple crypto trading system that fetches live cryptocurrency prices and generates BUY/SELL signals.

## 🛠 Tech Stack
- Backend: FastAPI (Python)
- Frontend: React (Vite + Bootstrap)
- API: CoinGecko

## 🔗 Live Links
- Frontend: https://your-vercel-link
- Backend: https://your-render-link

## 📊 Features
- Get live crypto price (/price)
- Generate BUY/SELL signal (/signal)
- Auto-refresh every 5 seconds
- Clean UI dashboard

## ▶️ Run Locally

### Backend
cd backend  
pip install -r requirements.txt  
uvicorn main:app --reload  

### Frontend
cd frontend  
npm install  
npm run dev  

## 💡 Notes
- Implemented caching to avoid API rate limits
- Used simple logic for trading signal