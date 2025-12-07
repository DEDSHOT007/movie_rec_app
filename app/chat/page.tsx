"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, User, Bot, Sparkles } from "lucide-react"

type Message = {
    role: "user" | "assistant"
    content: string
}

export default function ChatPage() {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm your movie assistant. Tell me what kind of mood you're in, or reference a movie you love, and I'll find something perfect for you." }
    ])
    const [loading, setLoading] = useState(false)

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMsg: Message = { role: "user", content: input }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setLoading(true)

        // Simulate AI response for now
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "That sounds like a great vibe. Based on that, I'd recommend 'Inception' (2010). It has that mind-bending quality you're looking for."
            }])
            setLoading(false)
        }, 1500)
    }

    return (
        <div className="flex flex-col h-screen bg-background">
            <header className="flex items-center h-14 border-b px-6 shrink-0 z-10 bg-background/95 backdrop-blur">
                <span className="font-bold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI Assistant
                </span>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="max-w-2xl mx-auto space-y-4">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                                {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </div>
                            <div className={`p-4 rounded-lg text-sm max-w-[80%] ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                <Bot className="h-4 w-4" />
                            </div>
                            <div className="bg-muted p-4 rounded-lg text-sm flex items-center gap-1">
                                <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <div className="p-4 border-t bg-background">
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <Input
                            placeholder="e.g., 'Something scary but with a happy ending'"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            disabled={loading}
                        />
                        <Button type="submit" size="icon" disabled={loading}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
