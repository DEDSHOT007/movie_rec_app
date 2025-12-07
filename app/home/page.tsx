import { AuthForm } from "@/components/auth/auth-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, Sparkles } from "lucide-react"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold hidden sm:inline-block">MovieAI</span>
                    </Link>
                    <div className="flex flex-1 items-center space-x-2 md:justify-end">
                        <div className="w-full flex-1 md:w-auto md:flex-none">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search movies..." className="pl-8 md:w-[300px] lg:w-[400px]" />
                            </div>
                        </div>
                        <nav className="flex items-center space-x-2">
                            <Link href="/chat">
                                <Button variant="ghost" size="icon">
                                    <Sparkles className="h-4 w-4" />
                                    <span className="sr-only">AI Chat</span>
                                </Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="container py-6">
                <section className="mb-8 space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">Welcome Back</h2>
                    <p className="text-muted-foreground">Here are some movies picked just for you.</p>
                    {/* Placeholder for Movie Grid - Using AuthForm temporarily to show we have auth */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="col-span-1">
                            <AuthForm />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
