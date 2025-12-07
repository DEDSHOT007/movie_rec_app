# MovieAI - AI-Powered Movie Recommendation App

MovieAI is a modern, intelligent web application that helps you find your next favorite movie using the power of Artificial Intelligence. Unlike traditional filters, MovieAI understands natural language, mood, and context to provide highly personalized recommendations.

![MovieAI Hero](https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop)

## 🚀 Features

-   **🤖 Natural Language Search**: "Find me a movie like Inception but funny" - simply ask, and our AI understands.
-   **🎭 Mood-Based Recommendations**: Select your current mood (Chill, Adventurous, Sad) to get tailored picks.
-   **🎬 Comprehensive Movie Data**: Detailed information, cast, crews, and ratings powered by TMDB.
-   **👤 User Profiles & Watchlist**: Create an account to save movies for later.
-   **🌗 Modern UI**: A sleek, dark-mode-first interface built with Tailwind CSS and Framer Motion.

## 🛠️ Tech Stack

-   **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
-   **Backend**: Next.js API Routes (Serverless)
-   **AI & LLM**: [OpenAI API](https://openai.com/) (GPT-4)
-   **Database**: [Supabase](https://supabase.com/) (PostgreSQL + Auth)
-   **Data Source**: [TMDB API](https://www.themoviedb.org/documentation/api)

## 🏁 Getting Started

### Prerequisites

-   Node.js 18+
-   A Supabase account
-   A TMDB API Key
-   An OpenAI API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/movie-ai.git
    cd movie-ai
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Rename `.env.local.example` to `.env.local` and add your keys:
    ```bash
    cp .env.local.example .env.local
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📦 Deployment

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions on Vercel and Supabase setup.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
