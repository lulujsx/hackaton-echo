import { useState } from 'react'

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatResponse {
  success: boolean
  message: string
  sessionId: string
}

export function useChat() {
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => `user_${Date.now()}`)
  
  // Verificar que la variable de entorno esté disponible
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'

  const sendMessage = async (message: string): Promise<string> => {
    setIsLoading(true)
    
    try {
      const url = `${backendUrl}/chat`
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          message,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error del servidor:', errorText)
        throw new Error(`Error del servidor: ${response.status} - ${errorText}`)
      }

      const data: ChatResponse = await response.json()
      
      if (!data.success) {
        throw new Error('Error en la respuesta del chatbot')
      }

      return data.message
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('No se puede conectar con el backend. Verifica que esté ejecutándose en el puerto 3000.')
      }
      throw new Error('No se pudo conectar con el chatbot. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    sendMessage,
    isLoading,
    sessionId,
  }
} 