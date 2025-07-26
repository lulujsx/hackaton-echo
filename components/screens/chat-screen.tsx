"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Bot, User, Loader2 } from "lucide-react"
import type { ProductInfo } from "@/app/page"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  isFinalQuestion?: boolean
}

interface ChatScreenProps {
  onComplete: (productInfo: ProductInfo) => void
}

export function ChatScreen({ onComplete }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente para crear contenido. Vamos a conocer mejor tu marca o producto. ¿Cómo se llama tu producto o servicio?",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const questions = [
    "¿Cómo se llama tu producto o servicio?",
    "¿Podrías describir brevemente qué hace tu producto?",
    "¿Cuál es tu mercado objetivo principal?",
    "¿Cuáles son las características más importantes de tu producto?",
    "¿Qué problema específico resuelve tu producto para los usuarios?",
  ]

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const nextQuestionIndex = questionCount + 1
      const isLastQuestion = nextQuestionIndex >= questions.length - 1

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: isLastQuestion
          ? "Perfecto, ya tengo toda la información necesaria sobre tu producto. ¿Estás listo para continuar con la selección de personas?"
          : questions[nextQuestionIndex] || "Cuéntame más detalles sobre tu producto.",
        isFinalQuestion: isLastQuestion,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setQuestionCount(nextQuestionIndex)
      setIsLoading(false)
    }, 1000)
  }

  const handleContinue = () => {
    // Extract product info from messages
    const productInfo: ProductInfo = {
      name: "Mi Producto", // This would be extracted from chat
      description: "Descripción del producto basada en el chat",
      targetMarket: "Mercado objetivo identificado",
      features: ["Característica 1", "Característica 2"],
    }
    onComplete(productInfo)
  }

  const handleKeepModifying = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: "¿Qué te gustaría modificar o agregar sobre tu producto?",
    }
    setMessages((prev) => [...prev, newMessage])
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#dee2e6] px-6 py-6">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#212529] mb-2">Tu marca / tu producto</h1>
          <p className="text-[#6c757d]">Cuéntanos sobre tu producto para crear contenido personalizado</p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 container max-w-4xl mx-auto px-6 py-6">
        <Card className="h-[calc(100vh-200px)] flex flex-col bg-white border-[#dee2e6] card-rounded">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 bg-[#212529] rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div className={`max-w-[70%] ${message.role === "user" ? "order-first" : ""}`}>
                    <div
                      className={`p-4 card-rounded ${
                        message.role === "user"
                          ? "bg-[#212529] text-white"
                          : "bg-[#f8f9fa] text-[#212529] border border-[#dee2e6]"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>

                    {/* Final question buttons */}
                    {message.isFinalQuestion && (
                      <div className="flex gap-3 mt-4 justify-end">
                        <Button
                          variant="outline"
                          onClick={handleKeepModifying}
                          className="btn-height border-[#dee2e6] text-[#6c757d] hover:bg-[#f8f9fa] smooth-transition bg-transparent"
                        >
                          Seguir modificando
                        </Button>
                        <Button
                          onClick={handleContinue}
                          className="btn-height bg-[#212529] hover:bg-[#212529]/90 text-white smooth-transition"
                        >
                          Ok. Continuar
                        </Button>
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 bg-[#6c757d] rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="w-8 h-8 bg-[#212529] rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-[#f8f9fa] border border-[#dee2e6] p-4 card-rounded">
                    <Loader2 className="w-4 h-4 animate-spin text-[#6c757d]" />
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[#dee2e6] p-6">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu respuesta..."
                className="flex-1 border-[#dee2e6] focus:ring-[#212529] focus:border-[#212529] card-rounded"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="btn-height bg-[#212529] hover:bg-[#212529]/90 text-white smooth-transition"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
