"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw, ArrowRight, Bold, Italic, List, User } from "lucide-react"
import type { UserPersona } from "@/app/page"

interface ScriptScreenProps {
  persona: UserPersona
  initialScript: string
  onComplete: (script: string) => void
}

export function ScriptScreen({ persona, initialScript, onComplete }: ScriptScreenProps) {
  const [script, setScript] = useState(initialScript)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  const handleRegenerate = async () => {
    setIsRegenerating(true)

    // Simulate script regeneration
    setTimeout(() => {
      const newScript = `
🎬 GUIÓN REGENERADO PARA TIKTOK - ${persona.name.toUpperCase()}

HOOK ALTERNATIVO (0-3s):
"¿Sabías que el 80% de las personas no sabe en qué gasta su dinero?"

DESARROLLO MEJORADO (3-12s):
${persona.productUsage}

Ahora puedo planificar mejor y hasta me sobra plata a fin de mes.

CALL TO ACTION POTENTE (12-15s):
"¿Querés tomar control de tus finanzas? Te dejo el link en mi bio 👆"

ELEMENTOS VISUALES MEJORADOS:
- Animaciones de números y gráficos
- Before/after de gastos
- Screenshots reales de la app

MÚSICA: Trending sound motivacional
HASHTAGS: #finanzaspersonales #dinero #ahorro #presupuesto #${persona.name.toLowerCase()}tips
      `.trim()

      setScript(newScript)
      setIsRegenerating(false)
    }, 2000)
  }

  const handleContinue = () => {
    setIsLocked(true)
    onComplete(script)
  }

  const formatText = (type: "bold" | "italic" | "list") => {
    // Simple text formatting logic would go here
    console.log(`Format text as ${type}`)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white border-b border-[#dee2e6] px-6 py-6">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#f8f9fa] border-2 border-[#dee2e6] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-[#6c757d]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#212529]">Edición de guión</h1>
              <p className="text-[#6c757d]">
                Persona seleccionada: <span className="font-medium">{persona.name}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs border-[#dee2e6] text-[#6c757d]">
              {persona.age} años
            </Badge>
            <Badge variant="outline" className="text-xs border-[#dee2e6] text-[#6c757d]">
              {persona.occupation}
            </Badge>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="container max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-[#dee2e6] card-rounded">
              <CardHeader className="border-b border-[#dee2e6]">
                <CardTitle className="text-lg text-[#212529] flex items-center justify-between">
                  Guión de contenido
                  {/* Format Controls */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => formatText("bold")}
                      disabled={isLocked}
                      className="w-8 h-8 p-0 border-[#dee2e6] hover:bg-[#f8f9fa]"
                    >
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => formatText("italic")}
                      disabled={isLocked}
                      className="w-8 h-8 p-0 border-[#dee2e6] hover:bg-[#f8f9fa]"
                    >
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => formatText("list")}
                      disabled={isLocked}
                      className="w-8 h-8 p-0 border-[#dee2e6] hover:bg-[#f8f9fa]"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <Textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  disabled={isLocked}
                  className="min-h-[500px] border-0 resize-none focus:ring-0 text-sm leading-relaxed font-mono"
                  placeholder="El guión aparecerá aquí..."
                />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                onClick={handleRegenerate}
                disabled={isRegenerating || isLocked}
                className="btn-height border-[#dee2e6] text-[#6c757d] hover:bg-[#f8f9fa] smooth-transition bg-transparent"
              >
                {isRegenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Regenerando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerar guión
                  </>
                )}
              </Button>

              <Button
                onClick={handleContinue}
                disabled={!script.trim() || isLocked}
                className="btn-height bg-[#212529] hover:bg-[#212529]/90 text-white smooth-transition"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Continuar a imágenes
              </Button>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="bg-white border-[#dee2e6] card-rounded">
              <CardHeader>
                <CardTitle className="text-lg text-[#212529]">Información de la persona</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-[#212529] mb-2">Contexto de vida</h4>
                  <p className="text-sm text-[#6c757d] leading-relaxed">{persona.lifeContext}</p>
                </div>

                <div>
                  <h4 className="font-medium text-[#212529] mb-2">Contenido en TikTok</h4>
                  <p className="text-sm text-[#6c757d] leading-relaxed">{persona.tiktokContent}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#dee2e6] card-rounded">
              <CardHeader>
                <CardTitle className="text-lg text-[#212529]">Tips para el guión</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-[#6c757d]">
                  <li>• Hook potente en los primeros 3 segundos</li>
                  <li>• Desarrollo claro y conciso (3-12s)</li>
                  <li>• Call to action específico (12-15s)</li>
                  <li>• Incluir elementos visuales</li>
                  <li>• Hashtags relevantes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
