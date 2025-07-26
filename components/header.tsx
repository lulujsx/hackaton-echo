import { Button } from "@/components/ui/button"
import { LayoutDashboard, Megaphone, Settings, User, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-slate-900">ContentAI</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="gap-2">
              <Megaphone className="w-4 h-4" />
              Campañas
            </Button>
            <Button variant="ghost" className="gap-2">
              <Settings className="w-4 h-4" />
              Configuración
            </Button>
          </nav>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="hidden sm:inline">Mi cuenta</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
