"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RotateCcw, ArrowRight, Bold, Italic, List } from "lucide-react"
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

    // Simular regeneración del guion
    setTimeout(() => {
      const newScript = `🎬 GUION REGENERADO PARA TIKTOK - ${persona.name}

APERTURA IMPACTANTE (0-2 segundos):
"¡STOP! ¿Sabés cuánto gastaste ayer?"

PROBLEMA (2-8 segundos):
"La mayoría no tiene ni idea. ${persona.productUsage.substring(50, 120)}..."

AGITACIÓN (8-15 segundos):
"Y así es como llegás a fin de mes preguntándote dónde se fue toda tu plata. Yo estaba igual hasta que..."

SOLUCIÓN (15-22 segundos):
"Descubrí esta app que cambió todo:
🔥 Tracking automático de gastos
🔥 Alertas inteligentes
🔥 Presupuestos que funcionan

PRUEBA SOCIAL (22-27 segundos):
"En solo un mes ahorré $15.000 que antes se me 'perdían'. ¿Querés hacer lo mismo?"

CTA FUERTE (27-30 segundos):
"Descargá la app AHORA. Link en bio ⬆️"

#dinero #finanzas #ahorro #app #presupuesto`

      setScript(newScript)
      setIsRegenerating(false)
    }, 2500)
  }

  const handleContinue = () => {
    setIsLocked(true)
    onComplete(script)
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#212529] mb-4">Edición de guion</h1>
        <p className="text-lg text-gray-600">
          Revisa y edita el guion generado para <span className="font-semibold">{persona.name}</span>
        </p>
      </div>

      <div className="space-y-6">
        {/* Persona Info */}
        <Card className="rounded-md border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#212529]">Perfil seleccionado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#212529] rounded-md flex items-center justify-center text-white font-bold">
                {persona.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-[#212529]">{persona.name}</h3>
                <p className="text-sm text-gray-600">
                  {persona.age} años, {persona.occupation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Script Editor */}
        <Card className="rounded-md border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#212529]">Guion de contenido</CardTitle>

              {/* Format Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-md border-gray-300 bg-transparent"
                  disabled={isLocked}
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-md border-gray-300 bg-transparent"
                  disabled={isLocked}
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-md border-gray-300 bg-transparent"
                  disabled={isLocked}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="min-h-[500px] text-sm leading-relaxed font-mono rounded-md border-gray-300 focus:border-[#212529] focus:ring-[#212529] resize-none transition-colors duration-150"
              placeholder="El guion aparecerá aquí..."
              disabled={isLocked}
            />

            <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
              <span>{script.length} caracteres</span>
              <span>Duración estimada: ~30 segundos</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleRegenerate}
            disabled={isRegenerating || isLocked}
            variant="outline"
            className="h-10 px-6 rounded-md border-gray-300 text-[#212529] hover:bg-gray-50 transition-colors duration-150 bg-transparent"
          >
            {isRegenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Regenerando...
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 mr-2" />
                Regenerar guion
              </>
            )}
          </Button>

          <Button
            onClick={handleContinue}
            disabled={!script.trim() || isLocked}
            className="h-10 px-6 rounded-md bg-[#212529] text-white hover:bg-gray-800 transition-colors duration-150"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Continuar a imágenes
          </Button>
        </div>
      </div>
    </div>
  )
}
