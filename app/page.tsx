"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Users, Compass } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 px-4 py-12 md:py-20">
        <div className="max-w-6xl w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-6 text-muted-foreground">
              <Compass className="w-5 h-5" />
              <span className="text-sm font-medium">Connect Local Guides with Travelers</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              Discover Authentic
              <br />
              <span className="text-primary">Local Experiences</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 text-pretty">
              Connect with passionate local guides who bring destinations to life, or share your expertise and earn
              while showcasing your city.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-12">
              <Link href="/find-guide" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-lg px-8 py-6 h-auto font-semibold">
                  <Users className="w-5 h-5 mr-2" />
                  Looking for a Guide?
                </Button>
              </Link>

              <Link href="/become-guide" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full text-lg px-8 py-6 h-auto font-semibold">
                  <MapPin className="w-5 h-5 mr-2" />
                  Providing tour guide services
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 md:mt-24">
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-card-foreground">Verified Guides</h3>
              <p className="text-muted-foreground text-sm">
                All guides are carefully vetted to ensure quality experiences
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-card-foreground">Local Expertise</h3>
              <p className="text-muted-foreground text-sm">Discover hidden gems only locals know about</p>
            </div>

            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-card-foreground">Custom Tours</h3>
              <p className="text-muted-foreground text-sm">Personalized experiences tailored to your interests</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          © 2025 Guide Connect. Connecting travelers with local experiences.
        </div>
      </footer>
    </div>
  )
}
