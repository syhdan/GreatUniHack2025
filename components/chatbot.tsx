"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GoogleGenAI } from "@google/genai"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { CornerDownLeft, Bot, X } from "lucide-react"

export function Chatbot() {
  const [chatQuery, setChatQuery] = useState("")
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "ai"; content: string }[]>([])
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const viewportRef = useRef<HTMLDivElement>(null)
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  })

  const handleChatQuery = async () => {
    if (!chatQuery) {
      return
    }

    setIsChatLoading(true)
    setChatHistory((prev) => [...prev, { role: "user", content: chatQuery }])
    setChatQuery("")

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a helpful AI assistant specializing in holidays and trip planning. The user is asking about what they can expect to see or do during their trip. Provide your answer in a friendly and conversational tone.\n\nUser: ${chatQuery}\nAI:`,
      })

      const sanitizedResponse = response.text?.replace(/\*/g, "") || "Sorry, I couldn't find any relevant information."

      setChatHistory((prev) => [...prev, { role: "ai", content: sanitizedResponse }])
    } catch (error) {
      console.error("Error fetching chat response:", error)
      setChatHistory((prev) => [...prev, { role: "ai", content: "Failed to fetch response. Please try again." }])
    } finally {
      setIsChatLoading(false)
    }
  }

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: viewportRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [chatHistory])

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={100} minSize={30}>
          <div className="w-[400px] h-[500px] bg-card border rounded-lg shadow-lg flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <h3 className="font-bold text-lg">Travel Assistant</h3>
              </div>
              <Button onClick={() => setIsOpen(false)} size="icon" variant="ghost">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <ScrollArea className="flex-1" viewportRef={viewportRef}>
              <div className="p-4 flex flex-col gap-4">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex gap-2 ${chat.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {chat.role === "ai" && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                    <div
                      className={`p-3 rounded-lg max-w-[80%] ${
                        chat.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm">{chat.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Ask a question..."
                  value={chatQuery}
                  onChange={(e) => setChatQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleChatQuery()}
                  disabled={isChatLoading}
                  className="pr-12"
                />
                <Button
                  onClick={handleChatQuery}
                  disabled={isChatLoading}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  size="icon"
                >
                  {isChatLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-primary" />
                  ) : (
                    <CornerDownLeft className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Panel>
        <PanelResizeHandle className="w-2 bg-transparent hover:bg-muted transition-colors" />
        <Panel collapsible collapsedSize={0} defaultSize={0} minSize={0} />
      </PanelGroup>
    </div>
  )
}
