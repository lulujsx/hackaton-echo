"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Save, Download, ArrowLeft, RefreshCw, Play, Pause, Volume2, VolumeX } from "lucide-react"
import type { UserPersona } from "@/app/page"

interface EditorScreenProps {
  persona: UserPersona
  script: string
  onBackToScript: () => void
}

interface GeneratedImage {
  id: string
  url: string
  prompt: string
  section: string
}

const mockImages: GeneratedImage[] = [
  {
    id: "1",
    url: "/placeholder.svg?height=400&width=300&text=Hook+Visual",
    prompt: "Persona joven mirando su teléfono con expresión preocupada",
    section: "Hook",
  },
  {
    id: "2",
    url: "/placeholder.svg?height=400&width=300&text=Problem+Scene",
    prompt: "Calculadora y billetes esparcidos en una mesa",
    section: "Problema",
  },
  {
    id: "3",
    url: "/placeholder.svg?height=400&width=300&text=App+Interface",
    prompt: "Interfaz de aplicación móvil de finanzas",
    section: "Solución",
  },
  {
    id: "4",
    url: "/placeholder.svg?height=400&width=300&text=Success+Story",
    prompt: "Persona sonriendo mientras usa la aplicación",
    section: "Resultado",
  },
  {
    id: "5",
    url: "/placeholder.svg?height=400&width=300&text=CTA+Visual",
    prompt: "Botón de descarga con efectos visuales llamativos",
    section: "Call to Action",
  },
]

export function EditorScreen({ persona, script, onBackToScript }: EditorScreenProps) {
  const [selectedImage, setSelectedImage] = useState<string>(mockImages[0].id)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleSave = () => {
    // Simular guardado
    console.log("Guardando proyecto...")
  }

  const handleExport = () => {
    // Simular exportación
    console.log("Exportando video...")
  }

  const scriptSections = script.split("\n\n").filter((section) => section.trim())

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBackToScript}
                variant="outline"
                className="h-10 px-4 rounded-md border-gray-300 text-[#212529] hover:bg-gray-50 transition-colors duration-150 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a editar guion
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-[#212529]">Editor de contenido final</h1>
              <Badge variant="secondary" className="bg-gray-100 text-[#212529]">
                {persona.name}
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleSave}
                variant="outline"
                className="h-10 px-4 rounded-md border-gray-300 text-[#212529] hover:bg-gray-50 transition-colors duration-150 bg-transparent"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </Button>
              <Button
                onClick={handleExport}
                className="h-10 px-4 rounded-md bg-[#212529] text-white hover:bg-gray-800 transition-colors duration-150"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Carousel */}
          <div className="space-y-6">
            <Card className="rounded-md border border-gray-200 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-[#212529]">Imágenes generadas</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 rounded-md border-gray-300 text-[#212529] hover:bg-gray-50 bg-transparent"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Regenerar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {mockImages.map((image, index) => (
                    <div
                      key={image.id}
                      className={`p-4 rounded-md border cursor-pointer transition-all duration-150 ${
                        selectedImage === image.id
                          ? "border-[#212529] bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedImage(image.id)}
                    >
                      <div className="flex gap-4">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.prompt}
                          className="w-20 h-24 object-cover rounded-md bg-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {image.section}
                            </Badge>
                            <span className="text-xs text-gray-500">#{index + 1}</span>
                          </div>
                          <p className="text-sm text-[#212529] font-medium mb-1">Slide {index + 1}</p>
                          <p className="text-xs text-gray-600 leading-relaxed">{image.prompt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - TikTok Preview */}
          <div className="space-y-6">
            <Card className="rounded-md border border-gray-200 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-[#212529]">Vista previa TikTok</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className="h-8 w-8 p-0 rounded-md border-gray-300"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="h-8 px-3 rounded-md border-gray-300"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 mr-1" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          Reproducir
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Phone Mockup */}
                <div className="mx-auto max-w-sm">
                  <div className="relative bg-black rounded-[2rem] p-2 shadow-xl">
                    <div className="bg-white rounded-[1.5rem] overflow-hidden aspect-[9/16]">
                      {/* TikTok Interface */}
                      <div className="relative h-full bg-black">
                        {/* Current Image */}
                        <img
                          src={mockImages[currentSlide]?.url || mockImages[0].url}
                          alt="Current slide"
                          className="w-full h-full object-cover"
                        />

                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                          {/* Progress Bars */}
                          <div className="absolute top-4 left-4 right-4 flex gap-1">
                            {mockImages.map((_, index) => (
                              <div
                                key={index}
                                className={`h-0.5 flex-1 rounded-full transition-colors duration-150 ${
                                  index === currentSlide ? "bg-white" : "bg-white/30"
                                }`}
                              />
                            ))}
                          </div>

                          {/* Script Text */}
                          <div className="absolute bottom-20 left-4 right-4">
                            <div className="bg-black/50 rounded-lg p-3 backdrop-blur-sm">
                              <p className="text-white text-sm leading-relaxed">
                                {scriptSections[currentSlide] ||
                                  scriptSections[0] ||
                                  "Texto del guion aparecerá aquí..."}
                              </p>
                            </div>
                          </div>

                          {/* TikTok UI Elements */}
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-white rounded-full"></div>
                              <span className="text-white text-sm font-medium">@{persona.name.toLowerCase()}</span>
                            </div>
                            <div className="flex items-center gap-4 text-white">
                              <div className="text-center">
                                <div className="w-8 h-8 bg-white/20 rounded-full mb-1"></div>
                                <span className="text-xs">12.3K</span>
                              </div>
                              <div className="text-center">
                                <div className="w-8 h-8 bg-white/20 rounded-full mb-1"></div>
                                <span className="text-xs">1.2K</span>
                              </div>
                              <div className="text-center">
                                <div className="w-8 h-8 bg-white/20 rounded-full mb-1"></div>
                                <span className="text-xs">Share</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide Navigation */}
                  <div className="flex justify-center gap-2 mt-6">
                    {mockImages.map((_, index) => (
                      <Button
                        key={index}
                        variant={index === currentSlide ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentSlide(index)}
                        className="w-8 h-8 p-0 rounded-md text-xs"
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Script Preview */}
            <Card className="rounded-md border border-gray-200 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-[#212529]">Guion completo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-60 overflow-y-auto">
                  <pre className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-mono">{script}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
