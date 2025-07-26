"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import type { ProductInfo, UserPersona } from "@/app/page"

interface PersonaScreenProps {
  productInfo: ProductInfo
  onPersonaSelected: (persona: UserPersona, script: string) => void
}

const mockPersonas: UserPersona[] = [
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
      "Vive solo en departamento céntrico, ingresos variables, busca optimizar sus finanzas para poder ahorrar e invertir.",
    tiktokContent:
      "Productividad, finanzas personales, lifestyle minimalista; tono directo, con datos y consejos prácticos.",
    productUsage:
      "Como freelancer mis ingresos cambian cada mes. Esta app me ayuda a planificar mejor y ver patrones en mis gastos que antes no notaba. Ahora puedo separar plata para inversiones sin quedarme corto.",
  },
  {
    id: "3",
    name: "Carolina",
    age: 24,
    occupation: "estudiante universitaria",
    lifeContext: "Vive con roommates, presupuesto ajustado, primera experiencia manejando finanzas independientes.",
    tiktokContent:
      "Vida universitaria, tips de ahorro para estudiantes, recetas económicas; tono divertido y relatable.",
    productUsage:
      "Mis papás siempre manejaron todo y cuando me mudé no tenía idea de cómo organizar mi plata. Con esta app aprendí a hacer presupuestos y ahora hasta me sobra para salir los fines de semana.",
  },
  {
    id: "4",
    name: "Roberto",
    age: 45,
    occupation: "empleado de comercio",
    lifeContext:
      "Casado, dos hijos adolescentes, busca planificar mejor los gastos familiares y ahorrar para el futuro de sus hijos.",
    tiktokContent: "Consejos familiares, planificación financiera, experiencias de padre; tono maduro y confiable.",
    productUsage:
      "Con los chicos creciendo los gastos se dispararon. Esta app me ayudó a ver dónde podíamos ajustar sin afectar lo importante. Ahora tenemos un fondo para la universidad de los pibes.",
  },
  {
    id: "5",
    name: "Sofía",
    age: 32,
    occupation: "profesional en recursos humanos",
    lifeContext:
      "Soltera, enfocada en su carrera, busca optimizar sus finanzas para lograr independencia económica total.",
    tiktokContent:
      "Empoderamiento femenino, finanzas para mujeres independientes, desarrollo profesional; tono motivacional.",
    productUsage:
      "Siempre fui buena ahorrando pero no sabía si lo hacía eficientemente. La app me mostró oportunidades de optimización que no veía. Ahora estoy más cerca de comprar mi departamento.",
  },
  {
    id: "6",
    name: "Diego",
    age: 26,
    occupation: "emprendedor gastronómico",
    lifeContext:
      "Maneja un food truck, ingresos diarios variables, necesita separar gastos personales de los del negocio.",
    tiktokContent: "Emprendimiento, comida callejera, tips de negocio; tono auténtico y motivador.",
    productUsage:
      "Al principio mezclaba todo, plata del negocio con gastos personales. Esta app me ayudó a separar las cuentas y ahora veo realmente cuánto gano y cuánto necesito para vivir.",
  },
]

export function PersonaScreen({ productInfo, onPersonaSelected }: PersonaScreenProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [loadingPersona, setLoadingPersona] = useState<string | null>(null)

  const handleGenerateContent = async (persona: UserPersona) => {
    setLoadingPersona(persona.id)

    // Simular llamada al backend para generar guion
    setTimeout(() => {
      const mockScript = `🎬 GUION PARA TIKTOK - ${persona.name}

HOOK (0-3 segundos):
"¿Te pasa que llegas a fin de mes y no sabés dónde se fue tu plata?"

DESARROLLO (3-12 segundos):
"Yo era igual que vos. ${persona.productUsage.substring(0, 100)}..."

SOLUCIÓN (12-20 segundos):
"Hasta que descubrí ${productInfo.name}. Ahora puedo:
✅ Ver todos mis gastos en tiempo real
✅ Crear presupuestos que realmente funcionen
✅ Recibir alertas antes de pasarme

CALL TO ACTION (20-25 segundos):
"Si querés tomar control de tu plata como yo, probá ${productInfo.name}. Link en mi bio 👆"

#finanzaspersonales #ahorro #presupuesto #dinero #organizacion`

      onPersonaSelected(persona, mockScript)
      setLoadingPersona(null)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#212529] mb-4">Seleccionar user persona</h1>
        <p className="text-lg text-gray-600">Elige el perfil de audiencia que mejor represente a tu público objetivo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockPersonas.map((persona) => (
          <Card
            key={persona.id}
            className="rounded-md border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer relative overflow-hidden"
            onMouseEnter={() => setHoveredCard(persona.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#212529] mb-2">{persona.name}</h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {persona.age} años, {persona.occupation}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#212529] mb-2">Contexto de vida:</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{persona.lifeContext}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#212529] mb-2">Contenido en TikTok:</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{persona.tiktokContent}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#212529] mb-2">Uso del producto:</h4>
                  <blockquote className="text-sm text-gray-700 italic leading-relaxed border-l-4 border-gray-300 pl-4">
                    "{persona.productUsage}"
                  </blockquote>
                </div>
              </div>

              {/* Hover Buttons */}
              {hoveredCard === persona.id && (
                <div className="absolute inset-0 bg-black/5 flex items-end justify-end p-6 transition-opacity duration-150">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      disabled
                      className="h-10 px-4 rounded-md border-gray-300 text-gray-400 cursor-not-allowed bg-transparent"
                    >
                      Editar user
                    </Button>
                    <Button
                      onClick={() => handleGenerateContent(persona)}
                      disabled={loadingPersona === persona.id}
                      className="h-10 px-4 rounded-md bg-[#212529] text-white hover:bg-gray-800 transition-colors duration-150"
                    >
                      {loadingPersona === persona.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Generando...
                        </>
                      ) : (
                        "Generar contenido"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
