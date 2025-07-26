"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Target, Clock, Eye, Volume2, Palette, Lightbulb } from "lucide-react"

interface ContentIdea {
  hook: string
  format: string
  audioType: string
  visualStyle: string
  duration: string
  target: string
}

interface SummaryPanelProps {
  contentIdea: ContentIdea | null
  onGoToEditor: () => void
}

export function SummaryPanel({ contentIdea, onGoToEditor }: SummaryPanelProps) {
  if (!contentIdea) {
    return (
      <div className="space-y-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Resumen de Ideas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 text-sm">Conversa con el asistente para generar ideas de contenido</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Tips para mejores resultados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-sm text-slate-600">Describe tu audiencia objetivo</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
              <p className="text-sm text-slate-600">Menciona el tipo de producto/servicio</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
              <p className="text-sm text-slate-600">Especifica el tono deseado</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Idea Generada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Target className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Hook</p>
                <p className="text-sm text-slate-900 font-medium">{contentIdea.hook}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Eye className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Formato</p>
                <Badge variant="secondary" className="mt-1">
                  {contentIdea.format}
                </Badge>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Volume2 className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Audio</p>
                <p className="text-sm text-slate-700">{contentIdea.audioType}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Palette className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Estilo Visual</p>
                <p className="text-sm text-slate-700">{contentIdea.visualStyle}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Duración</p>
                <p className="text-sm text-slate-700">{contentIdea.duration}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Target className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Audiencia</p>
                <p className="text-sm text-slate-700">{contentIdea.target}</p>
              </div>
            </div>
          </div>

          <Button
            onClick={onGoToEditor}
            className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 gap-2"
          >
            Ir al Editor
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">Métricas Estimadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">85%</p>
              <p className="text-xs text-slate-500">Potencial Viral</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">12K</p>
              <p className="text-xs text-slate-500">Views Estimadas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-teal-600">7.2%</p>
              <p className="text-xs text-slate-500">Engagement Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">450</p>
              <p className="text-xs text-slate-500">Shares Estimados</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
