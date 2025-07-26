"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Pause, Volume2, ImageIcon, Type, Download, Share, Settings, Plus, Trash2 } from "lucide-react"

interface ContentIdea {
  hook: string
  format: string
  audioType: string
  visualStyle: string
  duration: string
  target: string
}

interface VideoEditorProps {
  contentIdea: ContentIdea
  onBack: () => void
}

interface Slide {
  id: string
  image: string
  text: string
  duration: number
}

export function VideoEditor({ contentIdea, onBack }: VideoEditorProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: "1",
      image: "/placeholder.svg?height=400&width=300",
      text: contentIdea.hook,
      duration: 3,
    },
    {
      id: "2",
      image: "/placeholder.svg?height=400&width=300",
      text: "Paso 1: Configura tu espacio de trabajo",
      duration: 4,
    },
    {
      id: "3",
      image: "/placeholder.svg?height=400&width=300",
      text: "Paso 2: Utiliza estas herramientas",
      duration: 3,
    },
  ])

  const [selectedAudio, setSelectedAudio] = useState("trending-beat-1")

  const audioOptions = [
    { id: "trending-beat-1", name: "Trending Beat #1", duration: "0:15" },
    { id: "upbeat-pop", name: "Upbeat Pop", duration: "0:30" },
    { id: "chill-vibes", name: "Chill Vibes", duration: "0:20" },
    { id: "original-voice", name: "Solo Voz", duration: "Variable" },
  ]

  const updateSlideText = (slideId: string, newText: string) => {
    setSlides(slides.map((slide) => (slide.id === slideId ? { ...slide, text: newText } : slide)))
  }

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      image: "/placeholder.svg?height=400&width=300",
      text: "Nuevo texto aquí...",
      duration: 3,
    }
    setSlides([...slides, newSlide])
  }

  const removeSlide = (slideId: string) => {
    if (slides.length > 1) {
      setSlides(slides.filter((slide) => slide.id !== slideId))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Editor Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver al Chat
            </Button>
            <div className="h-6 w-px bg-slate-300"></div>
            <h1 className="text-xl font-semibold text-slate-900">Editor de Video</h1>
            <Badge variant="secondary">{contentIdea.format}</Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Settings className="w-4 h-4" />
              Configuración
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Share className="w-4 h-4" />
              Compartir
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Preview */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Vista Previa</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)} className="gap-2">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? "Pausar" : "Reproducir"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-[9/16] bg-black rounded-xl overflow-hidden relative max-w-sm mx-auto">
                  <img
                    src={slides[currentSlide]?.image || "/placeholder.svg"}
                    alt={`Slide ${currentSlide + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-white text-lg font-semibold leading-tight">{slides[currentSlide]?.text}</p>
                  </div>

                  {/* Progress indicator */}
                  <div className="absolute top-4 left-4 right-4 flex gap-1">
                    {slides.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 flex-1 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/30"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Slide Navigation */}
                <div className="flex justify-center gap-2 mt-4">
                  {slides.map((_, index) => (
                    <Button
                      key={index}
                      variant={index === currentSlide ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentSlide(index)}
                      className="w-8 h-8 p-0"
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Editor Controls */}
          <div className="space-y-6">
            {/* Slides Panel */}
            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Slides
                  </CardTitle>
                  <Button size="sm" onClick={addSlide} className="gap-1">
                    <Plus className="w-4 h-4" />
                    Agregar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      index === currentSlide
                        ? "border-purple-300 bg-purple-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={slide.image || "/placeholder.svg"}
                        alt={`Slide ${index + 1}`}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">Slide {index + 1}</p>
                        <p className="text-xs text-slate-500 truncate">{slide.text}</p>
                        <p className="text-xs text-slate-400">{slide.duration}s</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeSlide(slide.id)
                        }}
                        className="p-1 h-auto text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Text Editor */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Editar Texto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={slides[currentSlide]?.text || ""}
                  onChange={(e) => updateSlideText(slides[currentSlide]?.id, e.target.value)}
                  placeholder="Escribe el texto para esta slide..."
                  className="min-h-[100px] resize-none"
                />
                <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                  <span>
                    Slide {currentSlide + 1} de {slides.length}
                  </span>
                  <span>{slides[currentSlide]?.text.length || 0} caracteres</span>
                </div>
              </CardContent>
            </Card>

            {/* Audio Selection */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  Audio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {audioOptions.map((audio) => (
                  <div
                    key={audio.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedAudio === audio.id
                        ? "border-purple-300 bg-purple-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setSelectedAudio(audio.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{audio.name}</p>
                        <p className="text-xs text-slate-500">Duración: {audio.duration}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
