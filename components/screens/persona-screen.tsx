"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, User, Play } from "lucide-react"
import type { ProductInfo, UserPersona } from "@/app/page"

interface PersonaScreenProps {
  productInfo: ProductInfo
  onPersonaSelected: (persona: UserPersona, script: string) => void
}

const personas: UserPersona[] = [
  {
    id: "1",
    name: "Julieta",
    age: 38,
    occupation: "administrativa y madre de dos hijos",
    lifeContext:
      "Vive en zona suburbana, combina trabajo de oficina con tareas del hogar; busca simplificar su rutina y cuidar el presupuesto familiar.",
    tiktokContent: "Organización del hogar, tips de ahorro, rutinas familiares; tono cálido, cercano y práctico.",
    productUsage:
      "Yo antes anotaba los gastos en un cuaderno, pero entre el laburo y los chicos se me pasaban cosas… ahora con esta app veo todo desde el celular y ya no me llevo sorpresas a fin de mes. Me ayudó a ver en qué se me va la plata sin darme cuenta.",
  },
  {
    id: "2",
    name: "Martín",
    age: 29,
    occupation: "freelancer en marketing digital",
    lifeContext:
      "Trabaja desde casa, maneja múltiples clientes y proyectos; busca herramientas que le ayuden a ser más productivo y organizado.",
    tiktokContent: "Tips de productividad, herramientas digitales, vida freelancer; tono dinámico y motivacional.",
    productUsage:
      "Como freelancer necesito tener todo controlado. Esta app me permite trackear gastos por proyecto y cliente. Antes perdía tiempo con Excel, ahora todo es automático y puedo enfocarme en lo que realmente importa.",
  },
  {
    id: "3",
    name: "Sofía",
    age: 24,
    occupation: "estudiante universitaria",
    lifeContext:
      "Estudia y trabaja medio tiempo, vive con roommates; busca controlar sus gastos con presupuesto limitado.",
    tiktokContent: "Vida universitaria, tips de ahorro para estudiantes, recetas económicas; tono fresco y divertido.",
    productUsage:
      "Siendo estudiante cada peso cuenta. Con esta app puedo ver exactamente en qué gasto mi plata y donde puedo ahorrar. Me encanta que pueda categorizar todo y que me mande alertas cuando me paso del presupuesto.",
  },
  {
    id: "4",
    name: "Roberto",
    age: 45,
    occupation: "dueño de pequeño negocio",
    lifeContext:
      "Maneja una ferretería familiar, combina ventas presenciales y online; busca digitalizar y optimizar procesos.",
    tiktokContent:
      "Consejos para pequeños negocios, emprendimiento familiar, tips de ventas; tono confiable y experimentado.",
    productUsage:
      "Tengo mi ferretería hace 15 años y siempre llevé las cuentas a la antigua. Esta app me ayudó a digitalizar todo sin complicarme. Ahora puedo ver las ganancias reales y planificar mejor las compras de mercadería.",
  },
  {
    id: "5",
    name: "Camila",
    age: 32,
    occupation: "profesional en recursos humanos",
    lifeContext:
      "Trabaja en empresa multinacional, viaja frecuentemente por trabajo; busca simplicidad y eficiencia en sus finanzas personales.",
    tiktokContent: "Carrera profesional, tips de organización, balance vida-trabajo; tono profesional pero accesible.",
    productUsage:
      "Con tanto viaje de trabajo se me complicaba llevar el control de gastos. Esta app sincroniza todo automáticamente y puedo categorizar gastos personales vs empresariales. Me simplificó la vida completamente.",
  },
  {
    id: "6",
    name: "Diego",
    age: 27,
    occupation: "chef y emprendedor gastronómico",
    lifeContext:
      "Maneja un food truck y da clases de cocina; busca controlar costos de ingredientes y maximizar ganancias.",
    tiktokContent: "Recetas, tips de cocina, emprendimiento gastronómico; tono creativo y apasionado.",
    productUsage:
      "En gastronomía los márgenes son ajustados. Esta app me permite trackear el costo real de cada plato y ver qué me conviene más. Antes calculaba todo mental, ahora tengo datos precisos para tomar decisiones.",
  },
]

export function PersonaScreen({ productInfo, onPersonaSelected }: PersonaScreenProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [loadingPersona, setLoadingPersona] = useState<string | null>(null)

  const handleGenerateContent = async (persona: UserPersona) => {
    setLoadingPersona(persona.id)

    // Simulate script generation
    setTimeout(() => {
      const generatedScript = `
🎬 GUIÓN PARA TIKTOK - ${persona.name.toUpperCase()}

HOOK (0-3s):
"¿Te pasa que no sabés en qué se te va la plata?"

DESARROLLO (3-12s):
${persona.productUsage}

CALL TO ACTION (12-15s):
"Si te identificás, probá esta app que me cambió la vida financiera. Link en bio 👆"

ELEMENTOS VISUALES:
- Mostrar pantalla del celular con la app
- Transiciones dinámicas entre categorías
- Gráficos simples de gastos

MÚSICA: Trending sound optimista y energético
HASHTAGS: #finanzaspersonales #ahorro #app #${persona.name.toLowerCase()}
      `.trim()

      onPersonaSelected(persona, generatedScript)
      setLoadingPersona(null)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white border-b border-[#dee2e6] px-6 py-6">
        <div className="container max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#212529] mb-2">Seleccionar user persona</h1>
          <p className="text-[#6c757d]">Elige el perfil que mejor represente a tu audiencia objetivo</p>
        </div>
      </div>

      {/* Personas Grid */}
      <div className="container max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <Card
              key={persona.id}
              className={`bg-white border-[#dee2e6] card-rounded hover-lift smooth-transition cursor-pointer relative overflow-hidden ${
                hoveredCard === persona.id ? "shadow-lg" : ""
              }`}
              onMouseEnter={() => setHoveredCard(persona.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#f8f9fa] border-2 border-[#dee2e6] rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-[#6c757d]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#212529] mb-1">{persona.name}</h3>
                    <p className="text-sm text-[#6c757d]">
                      {persona.age} años, {persona.occupation}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <Badge variant="outline" className="mb-2 text-xs border-[#dee2e6] text-[#6c757d]">
                      Contexto de vida
                    </Badge>
                    <p className="text-sm text-[#212529] leading-relaxed">{persona.lifeContext}</p>
                  </div>

                  <div>
                    <Badge variant="outline" className="mb-2 text-xs border-[#dee2e6] text-[#6c757d]">
                      Contenido en TikTok
                    </Badge>
                    <p className="text-sm text-[#212529] leading-relaxed">{persona.tiktokContent}</p>
                  </div>

                  <div>
                    <Badge variant="outline" className="mb-2 text-xs border-[#dee2e6] text-[#6c757d]">
                      Uso del producto
                    </Badge>
                    <p className="text-sm text-[#212529] leading-relaxed italic">"{persona.productUsage}"</p>
                  </div>
                </div>

                {/* Hover Buttons */}
                {hoveredCard === persona.id && (
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center gap-3 fade-in">
                    <Button
                      onClick={() => handleGenerateContent(persona)}
                      disabled={loadingPersona === persona.id}
                      className="btn-height bg-[#212529] hover:bg-[#212529]/90 text-white smooth-transition"
                    >
                      {loadingPersona === persona.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Generando...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Generar contenido
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      disabled
                      className="btn-height border-[#dee2e6] text-[#6c757d] opacity-50 cursor-not-allowed bg-transparent"
                    >
                      Editar user
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
