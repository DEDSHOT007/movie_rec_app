import { Button } from "@/components/ui/button"
import { getMovieDetails, type MovieDetails } from "@/lib/tmdb"
import { ArrowLeft, Star, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PageProps {
    params: { id: string }
}

export default async function MoviePage({ params }: PageProps) {
    let movie: MovieDetails | null = null;
    let error: string | null = null;

    try {
        movie = await getMovieDetails(params.id);
    } catch (e) {
        console.error("Failed to fetch movie:", e);
        // For demo purposes, if API key is missing or fails, we might want to show a mock or just the error.
        error = "Could not load movie details. Please check TMDB_API_KEY.";
    }

    if (error || !movie) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Error</h1>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Link href="/home">
                    <Button variant="outline">Back to Home</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pb-10">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                {movie.backdrop_path ? (
                    <div className="absolute inset-0">
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-gray-800" />
                )}

                <Link href="/home" className="absolute top-4 left-4 z-10">
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>

                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{movie.title}</h1>
                    <div className="flex items-center gap-4 text-white/90 text-sm md:text-base mb-4">
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                        <span>•</span>
                        <span>{movie.runtime} min</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span>{movie.vote_average.toFixed(1)}</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button>
                            <Play className="h-4 w-4 mr-2" />
                            Watch Trailer
                        </Button>
                        <Button variant="secondary">
                            + Add to Watchlist
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container px-4 md:px-10 mt-6 grid md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold mb-3">Overview</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {movie.overview}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">Top Cast</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {movie.credits.cast.slice(0, 8).map((actor) => (
                                <div key={actor.id} className="flex-shrink-0 w-24 text-center">
                                    <div className="w-24 h-24 rounded-full overflow-hidden bg-muted mb-2">
                                        {actor.profile_path && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                                alt={actor.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <p className="text-sm font-medium leading-tight">{actor.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">AI Insight</h2>
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                            <p className="text-sm italic">
                                "If you enjoy complex narratives and stunning visuals, you'll love {movie.title}. The AI analysis suggests a high match for your preference for 'psychological thrillers'."
                            </p>
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="bg-card p-6 rounded-lg border">
                        <h3 className="font-semibold mb-4">Details</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-muted-foreground">Genres</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {movie.genres.map(g => (
                                        <span key={g.id} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Director</span>
                                <p className="font-medium">{movie.credits.crew.find(c => c.job === "Director")?.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
