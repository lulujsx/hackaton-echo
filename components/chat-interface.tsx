"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ContentIdea {
  hook: string
  format: string
  audioType: string
  visualStyle: string
  duration: string
  target: string
}

interface ChatInterfaceProps {
  messages: Message[]
  setMessages: (messages: Message[]) => void
  onIdeaGenerated: (idea: ContentIdea) => void
}

export function ChatInterface({ messages, setMessages, onIdeaGenerated }: ChatInterfaceProps) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateMockIdea = (userMessage: string): ContentIdea => {
    // Simulamos diferentes respuestas basadas en el input del usuario
    const ideas = [
      {
        hook: "¿Sabías que puedes hacer esto en 30 segundos?",
        format: "Tutorial rápido",
        audioType: "Trending sound viral",
        visualStyle: "Close-up con transiciones",
        duration: "15-30 segundos",
        target: "Millennials y Gen Z",
      },
      {
        hook: "POV: Cuando descubres este hack",
        format: "Antes y después",
        audioType: "Audio original con música de fondo",
        visualStyle: "Split screen",
        duration: "30-60 segundos",
        target: "Usuarios de 18-35 años",
      },
      {
        hook: "Esto cambió mi vida completamente",
        format: "Storytelling personal",
        audioType: "Voiceover emocional",
        visualStyle: "Secuencia narrativa",
        duration: "45-60 segundos",
        target: "Audiencia amplia",
      },
    ]

    return ideas[Math.floor(Math.random() * ideas.length)]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages([...messages, userMessage])
    setInput("")
    setIsLoading(true)

    // Simular respuesta del asistente
    setTimeout(() => {
      const idea = generateMockIdea(input)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `¡Perfecto! He generado una idea de contenido para ti. Aquí tienes una propuesta que podría funcionar muy bien:

**Hook sugerido:** "${idea.hook}"

**Formato:** ${idea.format}
**Tipo de audio:** ${idea.audioType}
**Estilo visual:** ${idea.visualStyle}
**Duración:** ${idea.duration}
**Audiencia objetivo:** ${idea.target}

Esta idea está diseñada para maximizar el engagement y aprovechar las tendencias actuales. ¿Te gusta la propuesta? Puedes ir al editor para empezar a crear tu video.`,
      }

      setMessages((prev) => [...prev, assistantMessage])
      onIdeaGenerated(idea)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && (
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "user" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-900"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>

            {message.role === "user" && (
              <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-slate-600" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-100 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-slate-100">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe tu marca o el tipo de contenido que quieres crear..."
            className="flex-1 rounded-xl border-slate-200 focus:border-purple-300 focus:ring-purple-200"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
