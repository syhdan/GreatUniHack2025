"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Compass, Users, MapPin, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleBecomeGuide = () => {
    if (!user) {
      router.push("/login?redirect=/apply")
    } else {
      router.push("/apply")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold">TourGuide</span>
          </Link>

          <div className="flex items-center gap-3">
            {mounted && (
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            )}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
                <Button
                  variant="outline"
                  onClick={() => {
                    localStorage.removeItem("user")
                    window.location.reload()
                  }}
                >
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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="text-center py-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Compass className="h-5 w-5 text-muted-foreground" />
            <p className="text-muted-foreground">Connect Local Guides with Travelers</p>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-4">Discover Authentic</h1>
          <h1 className="text-6xl md:text-7xl font-bold text-blue-500 mb-8">Local Experiences</h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Connect with passionate local guides who bring destinations to life, or share your expertise and earn while
            showcasing your city.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Link href="/guides" className="w-full sm:w-auto">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-6 text-lg rounded-xl w-full sm:w-auto">
                <Users className="mr-2 h-5 w-5" />
                Looking for a Guide?
              </Button>
            </Link>

            <Button
              onClick={handleBecomeGuide}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-12 py-6 text-lg rounded-xl w-full sm:w-auto"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Providing tour guide services
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-sm border">
              <div className="bg-blue-50 dark:bg-blue-950 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Verified Guides</h3>
              <p className="text-muted-foreground">All guides are carefully vetted to ensure quality experiences</p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-sm border">
              <div className="bg-yellow-50 dark:bg-yellow-950 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Local Expertise</h3>
              <p className="text-muted-foreground">Discover hidden gems only locals know about</p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-sm border">
              <div className="bg-yellow-50 dark:bg-yellow-950 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Compass className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Custom Tours</h3>
              <p className="text-muted-foreground">Personalized experiences tailored to your interests</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
