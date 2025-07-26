"use client"

import type React from "react"

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
        "¡Hola! Soy tu asistente para crear contenido de TikTok. Para empezar, cuéntame sobre tu marca o producto. ¿Cómo se llama y qué hace?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateNextQuestion = (userResponse: string, count: number): { content: string; isFinal: boolean } => {
    const questions = [
      "Perfecto. ¿Cuál es tu público objetivo principal? ¿A quién está dirigido tu producto?",
      "Excelente. ¿Cuáles son las principales características o beneficios que destacarías de tu producto?",
      "Muy bien. ¿Qué problema específico resuelve tu producto en la vida de tus usuarios?",
      "Genial. ¿Hay algún aspecto único o diferenciador que te gustaría destacar en el contenido?",
      "Perfecto, tengo toda la información que necesito sobre tu producto. ¿Hay algo más que te gustaría agregar o modificar antes de continuar con la selección de audiencia?",
    ]

    const isFinal = count >= 4
    return {
      content: questions[Math.min(count, questions.length - 1)],
      isFinal,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simular respuesta del backend
    setTimeout(() => {
      const nextQuestion = generateNextQuestion(input, questionCount)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: nextQuestion.content,
        isFinalQuestion: nextQuestion.isFinal,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setQuestionCount((prev) => prev + 1)
      setIsLoading(false)
    }, 1500)
  }

  const handleContinue = () => {
    // Simular extracción de información del producto
    const mockProductInfo: ProductInfo = {
      name: "MiApp Finanzas",
      description: "Aplicación móvil para control de gastos personales",
      targetMarket: "Familias jóvenes y adultos que buscan organizar sus finanzas",
      features: ["Control de gastos", "Presupuestos", "Reportes", "Sincronización bancaria"],
    }

    onComplete(mockProductInfo)
  }

  const finalMessage = messages[messages.length - 1]
  const showFinalButtons = finalMessage?.role === "assistant" && finalMessage?.isFinalQuestion && !isLoading

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#212529] mb-4">Tu marca / tu producto</h1>
        <p className="text-lg text-gray-600">Cuéntanos sobre tu producto para crear contenido personalizado</p>
      </div>

      <Card className="rounded-md border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 bg-[#212529] rounded-md flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className="flex flex-col max-w-[80%]">
                  <div
                    className={`rounded-md px-4 py-3 ${
                      message.role === "user" ? "bg-[#212529] text-white ml-auto" : "bg-gray-100 text-[#212529]"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>

                  {showFinalButtons && message.id === finalMessage.id && (
                    <div className="flex gap-3 mt-4 justify-end">
                      <Button
                        variant="outline"
                        className="h-10 px-6 rounded-md border-gray-300 text-[#212529] hover:bg-gray-50 transition-colors duration-150 bg-transparent"
                      >
                        Seguir modificando
                      </Button>
                      <Button
                        onClick={handleContinue}
                        className="h-10 px-6 rounded-md bg-[#212529] text-white hover:bg-gray-800 transition-colors duration-150"
                      >
                        Ok. Continuar
                      </Button>
                    </div>
                  )}
                </div>

                {message.role === "user" && (
                  <div className="w-10 h-10 bg-gray-300 rounded-md flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 bg-[#212529] rounded-md flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 rounded-md px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#212529]" />
                    <span className="text-sm text-[#212529]">Escribiendo...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {!showFinalButtons && (
            <div className="p-6 border-t border-gray-200">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                  className="flex-1 h-10 rounded-md border-gray-300 focus:border-[#212529] focus:ring-[#212529] transition-colors duration-150"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="h-10 px-4 rounded-md bg-[#212529] text-white hover:bg-gray-800 transition-colors duration-150"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
