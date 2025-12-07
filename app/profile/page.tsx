import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

export default function ProfilePage() {
    // Mock data for watchlist
    const watchlist = [
        { id: 1, title: 'Inception', year: '2010', poster: '/placeholder-movie.jpg' },
        { id: 2, title: 'The Dark Knight', year: '2008', poster: '/placeholder-movie.jpg' },
        { id: 3, title: 'Interstellar', year: '2014', poster: '/placeholder-movie.jpg' },
    ]

    return (
        <div className="min-h-screen bg-background p-6 md:p-10">
            <header className="mb-10">
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-muted-foreground">Manage your account and watchlist.</p>
            </header>

            <div className="grid gap-10 md:grid-cols-4">
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Stats</CardTitle>
                            <CardDescription>Your movie journey.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-2xl font-bold">142</div>
                                <div className="text-xs text-muted-foreground">Movies Watched</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">Sci-Fi</div>
                                <div className="text-xs text-muted-foreground">Favorite Genre</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">Edit Profile</Button>
                            <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-500">Sign Out</Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-3">
                    <h2 className="text-2xl font-semibold mb-6">Watchlist</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {watchlist.map((movie) => (
                            <Card key={movie.id} className="overflow-hidden group">
                                <div className="aspect-[2/3] bg-muted relative">
                                    {/* In a real app, use next/image with actual poster path */}
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                        Poster
                                    </div>
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button size="sm" variant="destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold leading-none">{movie.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{movie.year}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
