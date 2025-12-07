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
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (error) throw error
                setMessage({ type: "success", text: "Check your email for the confirmation link!" })
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                // On strict login, we might redirect or let a parent component handle state, 
                // but for now let's just show success or refresh
                window.location.reload()
            }
        } catch (error: any) {
            setMessage({ type: "error", text: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{mode === "login" ? "Login" : "Create Account"}</CardTitle>
                <CardDescription>
                    {mode === "login"
                        ? "Enter your email below to login to your account"
                        : "Enter your email below to create your account"}
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
                            />
                        </div>
                        {message && (
                            <div className={`text-sm ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
                                {message.text}
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full" type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {mode === "login" ? "Sign In" : "Sign Up"}
                    </Button>
                    <div className="text-sm text-muted-foreground text-center">
                        {mode === "login" ? (
                            <>
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMode("signup")
                                        setMessage(null)
                                    }}
                                    className="underline text-primary hover:text-primary/80"
                                >
                                    Sign up
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
                                    className="underline text-primary hover:text-primary/80"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}
