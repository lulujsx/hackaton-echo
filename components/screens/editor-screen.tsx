"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Save, Download, ArrowLeft, Play, Pause, SkipBack, SkipForward, ImageIcon } from "lucide-react"
import type { UserPersona } from "@/app/page"

interface EditorScreenProps {
  persona: UserPersona
  script: string
  onBackToScript: () => void
}

interface ImageSlide {
  id: string
  url: string
  alt: string
  duration: number
}

export function EditorScreen({ persona, script, onBackToScript }: EditorScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Mock generated images
  const imageSlides: ImageSlide[] = [
    {
      id: "1",
      url: "/placeholder.svg?height=400&width=300&text=Hook+Visual",
      alt: "Hook visual - ¿Te pasa que no sabés en qué se te va la plata?",
      duration: 3,
    },
    {
      id: "2",
      url: "/placeholder.svg?height=400&width=300&text=App+Screenshot",
      alt: "Screenshot de la app mostrando categorías de gastos",
      duration: 4,
    },
    {
      id: "3",
      url: "/placeholder.svg?height=400&width=300&text=Before+After",
      alt: "Comparación antes/después de usar la app",
      duration: 3,
    },
    {
      id: "4",
      url: "/placeholder.svg?height=400&width=300&text=Call+to+Action",
      alt: "Call to action con link en bio",
      duration: 2,
    },
  ]

  const handleSave = () => {
    console.log("Guardando proyecto...")
  }

  const handleExport = () => {
    console.log("Exportando video...")
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % imageSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + imageSlides.length) % imageSlides.length)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white border-b border-[#dee2e6] px-6 py-4">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={onBackToScript}
                className="btn-height border-[#dee2e6] text-[#6c757d] hover:bg-[#f8f9fa] bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a editar guión
              </Button>

              <div>
                <h1 className="text-2xl font-bold text-[#212529]">Editor de contenido final</h1>
                <p className="text-sm text-[#6c757d]">Persona: {persona.name}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleSave}
                className="btn-height border-[#dee2e6] text-[#6c757d] hover:bg-[#f8f9fa] bg-transparent"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </Button>
              <Button onClick={handleExport} className="btn-height bg-[#212529] hover:bg-[#212529]/90 text-white">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="container max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Carousel */}
          <div className="space-y-6">
            <Card className="bg-white border-[#dee2e6] card-rounded">
              <CardHeader>
                <CardTitle className="text-lg text-[#212529] flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Imágenes generadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {imageSlides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`border-2 card-rounded overflow-hidden cursor-pointer smooth-transition ${
                        index === currentSlide
                          ? "border-[#212529] shadow-md"
                          : "border-[#dee2e6] hover:border-[#6c757d]"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <div className="aspect-[3/4] bg-[#f8f9fa] flex items-center justify-center">
                        <img
                          src={slide.url || "/placeholder.svg"}
                          alt={slide.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs border-[#dee2e6] text-[#6c757d]">
                            Slide {index + 1}
                          </Badge>
                          <span className="text-xs text-[#6c757d]">{slide.duration}s</span>
                        </div>
                        <p className="text-sm text-[#212529] line-clamp-2">{slide.alt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - TikTok Preview */}
          <div className="space-y-6">
            <Card className="bg-white border-[#dee2e6] card-rounded">
              <CardHeader>
                <CardTitle className="text-lg text-[#212529]">Vista previa TikTok</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                {/* Phone Mockup */}
                <div className="relative">
                  <div className="w-[280px] h-[500px] bg-black rounded-[30px] p-2">
                    <div className="w-full h-full bg-white rounded-[25px] overflow-hidden relative">
                      {/* Video Preview */}
                      <div className="aspect-[9/16] bg-[#f8f9fa] relative">
                        <img
                          src={imageSlides[currentSlide]?.url || "/placeholder.svg"}
                          alt={imageSlides[currentSlide]?.alt}
                          className="w-full h-full object-cover"
                        />

                        {/* Play/Pause Overlay */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={togglePlayback}
                            className="w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full"
                          >
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                          </Button>
                        </div>

                        {/* Script Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-black/60 text-white p-3 rounded-lg text-sm">
                            {script.split("\n").slice(0, 3).join("\n")}...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="mt-4 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevSlide}
                      className="border-[#dee2e6] hover:bg-[#f8f9fa] bg-transparent"
                    >
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={togglePlayback}
                      className="border-[#dee2e6] hover:bg-[#f8f9fa] bg-transparent"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextSlide}
                      className="border-[#dee2e6] hover:bg-[#f8f9fa] bg-transparent"
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Slide Indicator */}
                  <div className="mt-2 text-center text-sm text-[#6c757d]">
                    {currentSlide + 1} / {imageSlides.length}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Script Preview */}
            <Card className="bg-white border-[#dee2e6] card-rounded">
              <CardHeader>
                <CardTitle className="text-lg text-[#212529]">Guión completo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                  <pre className="text-sm text-[#212529] whitespace-pre-wrap font-sans leading-relaxed">{script}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
