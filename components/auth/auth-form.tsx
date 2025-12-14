"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function AuthForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [mode, setMode] = useState<"login" | "signup">("login")
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            if (mode === "signup") {
                const { error, data } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (error) throw error

                // If auto-confirm is enabled, session exists immediately
                if (data.session) {
                    window.location.reload()
                } else {
                    setMessage({ type: "success", text: "Please check your email to confirm your account." })
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                window.location.reload()
            }
        } catch (error: any) {
            setMessage({ type: "error", text: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-[350px] border-zinc-800 bg-zinc-900 shadow-xl">
            <CardHeader>
                <CardTitle className="text-white">{mode === "login" ? "Welcome Back" : "Create Account"}</CardTitle>
                <CardDescription className="text-zinc-400">
                    {mode === "login"
                        ? "Enter your credentials to access your account"
                        : "Sign up to start your movie journey"}
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleAuth}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Input
                                id="email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Input
                                id="password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                            />
                        </div>
                        {message && (
                            <div className={`text-sm p-2 rounded ${message.type === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-green-500/10 text-green-400 border border-green-500/20"}`}>
                                {message.text}
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40" type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {mode === "login" ? "Sign In" : "Get Started"}
                    </Button>
                    <div className="text-sm text-zinc-400 text-center">
                        {mode === "login" ? (
                            <>
                                New here?{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMode("signup")
                                        setMessage(null)
                                    }}
                                    className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    Create an account
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMode("login")
                                        setMessage(null)
                                    }}
                                    className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    Sign in
                                </button>
                            </>
                        )}
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}
