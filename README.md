# 🎯 SensAI – Smart AI Career Coach

SensAI is your personal AI-powered career companion designed to help users explore careers, build resumes, prep for interviews, and stay informed with weekly insights.

🌐 **Live Demo**: [https://sensai-azure-phi.vercel.app](https://sensai-azure-phi.vercel.app)

---

## Key Features

✅ **Personalized Onboarding**  
Tailors content and recommendations based on user goals.

📊 **Weekly Industry Insights**  
Auto-generated every Sunday using the **Gemini API** – no manual updates needed.

📄 **Resume Builder**  
Simple, clean interface to create, edit, and **download** your resume.

🎤 **Interview Prep**  
Practice with smart AI-generated questions and review performance stats.

📈 **Dashboard**  
Track resumes, mock interviews, and career goals — all in one place.

---
| 📸 Screenshots |
|------------------------|
| **Homepage** |
| ![Homepage](https://hc-cdn.hel1.your-objectstorage.com/s/v3/e22f7b75aa0a1a0012fb0840c3702ae3edc951fd_image.png) |
| **Industry Insights** |
| ![Insights](https://hc-cdn.hel1.your-objectstorage.com/s/v3/9bff18df934825170c9c07dccabfb270af4af2a4_image.png) |
| **Resume Building** |
| ![Resume](https://hc-cdn.hel1.your-objectstorage.com/s/v3/a3ace0e948ed80ea4ff704a4bfa28111aeeb2819_image.png) |
---

## Tech Stack

- **Frontend**: Next.js 14, TailwindCSS, React
- **Auth**: Clerk
- **AI Engine**: Gemini API
- **Resume Export**: react-to-print

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/vthani25/sensai.git
cd sensai

# Install dependencies
npm install

# Add environment variables
# .env.local
CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
GEMINI_API_KEY=your_key

# Run locally
npm run dev
