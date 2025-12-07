const TMDB_API_KEY = process.env.TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids?: number[];
}

export interface MovieDetails extends Movie {
    genres: { id: number; name: string }[];
    runtime: number;
    tagline: string;
    credits: {
        cast: { id: number; name: string; profile_path: string | null; character: string }[];
        crew: { id: number; name: string; profile_path: string | null; job: string }[];
    };
}

async function fetchTMDB(endpoint: string, params: Record<string, string> = {}) {
    if (!TMDB_API_KEY) {
        throw new Error('TMDB_API_KEY is not defined');
    }

    const queryParams = new URLSearchParams({
        api_key: TMDB_API_KEY,
        ...params,
    });

    const res = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);

    if (!res.ok) {
        throw new Error(`TMDB API Error: ${res.statusText}`);
    }

    return res.json();
}

export async function getTrendingMovies(): Promise<Movie[]> {
    const data = await fetchTMDB('/trending/movie/day');
    return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
    const data = await fetchTMDB('/search/movie', { query });
    return data.results;
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
    const data = await fetchTMDB(`/movie/${id}`, {
        append_to_response: 'credits,similar',
    });
    return data;
}

export async function getMoviesByGenre(genreId: string): Promise<Movie[]> {
    const data = await fetchTMDB('/discover/movie', {
        with_genres: genreId,
        sort_by: 'popularity.desc',
    });
    return data.results;
}
