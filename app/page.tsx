"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { AppHeader } from "@/components/app-header"
import { ArrowRight, CheckCircle, Globe, Star } from "lucide-react"

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  const handleBecomeGuide = () => {
    if (!user) {
      router.push("/login?redirect=/apply")
    } else {
      router.push("/apply")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main>
        <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-black/50" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="https://cdn.pixabay.com/video/2020/05/19/36202-422534895_large.mp4"
          />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Your Journey, Your Guide
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Explore the world with passionate local guides who bring destinations to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/guides">
                <Button size="lg" className="w-full sm:w-auto">
                  Find a Guide
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="secondary" onClick={handleBecomeGuide} className="w-full sm:w-auto">
                Become a Guide
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Why Choose CrossWorlds?</h2>
              <p className="text-lg text-muted-foreground mt-2">
                The premier platform for authentic travel experiences.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-card p-8 rounded-lg shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Verified Guides</h3>
                <p className="text-muted-foreground">
                  Every guide on our platform is vetted for quality and safety, ensuring you have the best possible experience.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Globe className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Global & Local</h3>
                <p className="text-muted-foreground">
                  From bustling cities to remote landscapes, find local experts who know the place like the back of their hand.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Star className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Tailored Experiences</h3>
                <p className="text-muted-foreground">
                  Connect with guides to create personalized tours that match your interests, pace, and style.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
