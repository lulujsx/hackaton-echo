import { useState } from 'react'

interface ProfileRequest {
  sessionId: string
  count: number
  platform: string
  tone: string
}

interface UserProfile {
  id: string
  name: string
  age: number
  occupation: string
  lifeContext: string
  contentType: string
  productUsage: string
  location: string
  interests: string[]
  lifestyle: string
  painPoints: string
  goals: string
  socialMediaPresence: string
  contentThemes: string[]
  toneOfVoice: string
  engagementStyle: string
  authenticityScore: string
}

interface ProfilesResponse {
  success: boolean
  message: string
  data: UserProfile[]
}

export function useProfiles() {
  const [isLoading, setIsLoading] = useState(false)
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'

  const generateProfiles = async (request: ProfileRequest): Promise<UserProfile[]> => {
    setIsLoading(true)
    
    try {
      const url = `${backendUrl}/chat/user-profiles/generate`
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error del servidor:', errorText)
        throw new Error(`Error del servidor: ${response.status} - ${errorText}`)
      }

      const data: ProfilesResponse = await response.json()
      
      if (!data.success) {
        throw new Error('Error en la generación de perfiles')
      }

      return data.data
    } catch (error) {
      console.error('Error al generar perfiles:', error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('No se puede conectar con el backend. Verifica que esté ejecutándose.')
      }
      throw new Error('No se pudieron generar los perfiles. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    generateProfiles,
    isLoading,
  }
} 