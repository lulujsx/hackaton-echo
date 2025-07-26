"use client"

import { useState } from "react"
import { ChatScreen } from "@/components/screens/chat-screen"
import { PersonaScreen } from "@/components/screens/persona-screen"
import { ScriptScreen } from "@/components/screens/script-screen"
import { EditorScreen } from "@/components/screens/editor-screen"

export type AppScreen = "chat" | "persona" | "script" | "editor"

export interface ProductInfo {
  name: string
  description: string
  targetMarket: string
  features: string[]
}

export interface UserPersona {
  id: string
  name: string
  age: number
  occupation: string
  lifeContext: string
  tiktokContent: string
  productUsage: string
}

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("chat")
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null)
  const [selectedPersona, setSelectedPersona] = useState<UserPersona | null>(null)
  const [script, setScript] = useState<string>("")

  const handleChatComplete = (info: ProductInfo) => {
    setProductInfo(info)
    setCurrentScreen("persona")
  }

  const handlePersonaSelected = (persona: UserPersona, generatedScript: string) => {
    setSelectedPersona(persona)
    setScript(generatedScript)
    setCurrentScreen("script")
  }

  const handleScriptComplete = (finalScript: string) => {
    setScript(finalScript)
    setCurrentScreen("editor")
  }

  const handleBackToScript = () => {
    setCurrentScreen("script")
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {currentScreen === "chat" && <ChatScreen onComplete={handleChatComplete} />}

      {currentScreen === "persona" && productInfo && (
        <PersonaScreen productInfo={productInfo} onPersonaSelected={handlePersonaSelected} />
      )}

      {currentScreen === "script" && selectedPersona && (
        <ScriptScreen persona={selectedPersona} initialScript={script} onComplete={handleScriptComplete} />
      )}

      {currentScreen === "editor" && selectedPersona && (
        <EditorScreen persona={selectedPersona} script={script} onBackToScript={handleBackToScript} />
      )}
    </div>
  )
}
