"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Compass, Moon, Sun, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"

export function AppHeader() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.reload()
  }

  const isAuthPage = pathname === "/login" || pathname === "/signup"
  const showBackButton = pathname !== "/"

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              aria-label="Go back"
              className="hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Compass className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold">CrossWorlds</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          )}
          {!isAuthPage && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
                  <Button variant="outline" onClick={handleLogout}>
                    Log out
                  </Button>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">Log in</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">Sign up</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
