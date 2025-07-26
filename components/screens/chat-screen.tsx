"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChatInterface } from "@/components/chat-interface"
import type { ProductInfo } from "@/app/page"

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

  const handleIdeaGenerated = (idea: ContentIdea) => {
    // Aquí podrías manejar la idea generada si es necesario
  }

  const handleComplete = () => {
    // Extract product info from messages
    const productInfo: ProductInfo = {
      name: "Mi Producto", // This would be extracted from chat
      description: "Descripción del producto basada en el chat",
      targetMarket: "Mercado objetivo identificado",
      features: ["Característica 1", "Característica 2"],
    }
    onComplete(productInfo)
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
          <ChatInterface 
            messages={messages}
            setMessages={setMessages}
            onIdeaGenerated={handleIdeaGenerated}
          />
        </Card>
      </div>
    </div>
  )
}
