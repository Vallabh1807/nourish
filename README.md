# 🌿 Nourish — AI-Powered Indian Diet Planner & Tracker

A beautifully designed React + Vite web app that uses **Groq AI** (Llama 3.3 / Gemma 2) to generate personalised Indian meal plans and track your daily nutrition — all with common, home-cooked Indian foods.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_AI-LLama_3.3-F55036?logo=meta&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧮 **Smart BMR Calculator** | Mifflin-St Jeor formula adjusted for activity level and goal |
| 📋 **4-Step Onboarding** | Gender, diet type (veg/egg/non-veg), body type, fitness goal |
| 🍛 **AI Meal Plans** | Full-day plans using everyday Indian foods — roti, dal, sabzi, poha, etc. |
| ✍️ **Meal Logger** | Describe what you ate in plain text; AI breaks down nutrition per item |
| 📊 **Daily Summary** | Calorie ring, macro pie chart, progress bars, per-meal bar chart |
| 💾 **Persistent Data** | Plans and logs saved per day in localStorage |
| 🔄 **Model Fallback** | Automatically tries multiple AI models if one is rate-limited |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- A free [Groq API key](https://console.groq.com/keys)

### 1. Clone the repo
```bash
git clone https://github.com/Vallabh1807/nourish.git
cd nourish
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your API key
```bash
cp .env.example .env
```
Open `.env` and replace `your_groq_api_key_here` with your actual Groq API key:
```env
VITE_GROQ_API_KEY=gsk_your_actual_key_here
```

### 4. Run the dev server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```
nourish/
├── .env.example                # Template for environment variables
├── .gitignore
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                # Entry point
    ├── App.jsx                 # Root component (screen router)
    ├── index.css               # Global styles + animations
    │
    ├── hooks/
    │   └── useAppState.js      # Central state + localStorage persistence
    │
    ├── utils/
    │   ├── constants.js        # Colors, labels, option lists
    │   ├── helpers.js          # Date utils, BMR calc, storage wrappers
    │   ├── gemini.js           # Groq AI API calls + model fallback
    │   └── styles.js           # Shared inline style objects
    │
    ├── components/
    │   ├── UI.jsx              # Btn, Input, Card, NutPill, NutrientBar …
    │   ├── Header.jsx          # App header + TabBar
    │   ├── PlanMealCard.jsx    # Collapsible meal plan card
    │   └── LogMealCard.jsx     # Collapsible meal log card with AI analysis
    │
    └── screens/
        ├── OnboardingScreen.jsx    # 4-step profile setup
        ├── CalorieResultScreen.jsx # Calculated daily targets
        ├── MealPlanTab.jsx         # Tab 1 — AI generated day plan
        ├── LogMealsTab.jsx         # Tab 2 — log and analyze meals
        └── SummaryTab.jsx          # Tab 3 — charts and daily totals
```

---

## 🔑 API Key Setup

This app uses the **Groq API** for fast AI inference. Groq offers a generous free tier.

1. Go to [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up / log in and create a new API key
3. Add it to your `.env` file as shown above

The app tries these models in order (automatic fallback on rate-limit):
1. `llama-3.3-70b-versatile` — best quality
2. `llama-3.1-8b-instant` — faster, lighter
3. `gemma2-9b-it` — Google's Gemma 2

---

## 🎨 Design System

| Element | Value |
|---|---|
| **Background** | `#F5F0E8` warm cream |
| **Text** | `#1C1C1C` rich ink |
| **Accent** | `#C8A96E` muted gold |
| **Heading Font** | Cormorant Garamond (serif) |
| **Body Font** | Outfit (sans-serif) |
| **Charts** | Recharts (PieChart, BarChart) |

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite 5
- **AI:** Groq API (OpenAI-compatible endpoint)
- **Charts:** Recharts
- **Storage:** Browser localStorage
- **Styling:** Vanilla CSS + inline styles

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with 🍛 by <a href="https://github.com/Vallabh1807">Vallabh</a>
</p>
