"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import type { Profile } from "@/types/database"
import { Menu, X, Search } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()
        setProfile(profileData)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => setProfile(data))
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/noticias", label: "Noticias" },
    { href: "/foros", label: "Foro" },
    { href: "/conocimiento", label: "Cursos" },
    { href: "/multimedia", label: "Multimedia" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1a1f2e] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className=" rounded-lg flex items-center justify-center">
              <Image src="/logo.png" alt="PISAG Logo" width={80} height={80} className="rounded-lg" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={link.href === "/" ? true : false}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side - Search and User */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
              <Search className="h-5 w-5" />
            </Button>

            {user && profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-white">
                    <span className="hidden sm:inline text-sm">{profile.username}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-600 text-white text-xs">
                        {profile.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{profile.username}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="px-2 py-2 rounded-md hover:bg-slate-100 hover:text-slate-900">
                    <Link href="/perfil" prefetch={false} className="w-full block">Mi Perfil</Link>
                  </DropdownMenuItem>
                  {profile.role === "admin" && (
                    <DropdownMenuItem className="px-2 py-2 rounded-md hover:bg-slate-100 hover:text-slate-900">
                      <Link href="/admin" prefetch={false} className="w-full block">Panel de Administración</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive px-2 py-2 rounded-md hover:bg-red-50">
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild className="text-white hover:bg-gray-800">
                  <Link href="/auth/login">Iniciar Sesión</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href) ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
