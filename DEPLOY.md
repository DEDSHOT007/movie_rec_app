# Deployment & Setup Guide

## 1. Environment Setup

Rename `.env.local.example` to `.env.local` and populate it with your real API keys:

```env
TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key_here
```

### Where to get keys?
- **TMDB**: [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
- **Supabase**: [supabase.com/dashboard/project/api](https://supabase.com/dashboard)
- **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

## 2. Database Setup (Supabase)

1.  Go to your Supabase Project Dashboard -> **SQL Editor**.
2.  Open the file `supabase/schema.sql` in this project.
3.  Copy the entire content.
4.  Paste it into the Supabase SQL Editor.
5.  Click **Run**.

This will create the `profiles` and `watchlist` tables and set up the necessary triggers.

## 3. Deploy to Vercel

1.  Push this code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and "Import Project".
3.  Select your GitHub repo.
4.  In the "Environment Variables" section of the Vercel deployment screen, add the same variables from your `.env.local`.
5.  Click **Deploy**.

## 4. Troubleshooting

- **Images not loading?**: Ensure `next.config.ts` allows the image hostname (already configured for `image.tmdb.org`).
- **Auth not working?**: Check Supabase "Authentication" -> "URL Configuration". Ensure your Site URL (e.g., `https://your-project.vercel.app`) is added to "Redirect URLs".
