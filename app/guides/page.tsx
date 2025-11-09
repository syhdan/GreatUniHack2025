"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { TourGuide } from "@/lib/types"
import { AppHeader } from "@/components/app-header"
import { Chatbot } from "@/components/chatbot"
import { TourGuideCard } from "@/components/tour-guide-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function GuidesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [guides, setGuides] = useState<TourGuide[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchGuides()
  }, [])

  const fetchGuides = async (city?: string) => {
    setIsLoading(true)
    try {
      const url = city ? `/api/guides?city=${encodeURIComponent(city)}` : "/api/guides"
      const response = await fetch(url)
      const data = await response.json()
      setGuides(data)
    } catch (error) {
      console.error("Error fetching guides:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    fetchGuides(searchQuery)
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Guide</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Search for local tour guides in your destination and discover authentic experiences.
          </p>
        </div>

        <div className="flex gap-2 max-w-2xl mx-auto mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter a city name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-10"
            />
          </div>
          <Button onClick={handleSearch}>
            Search
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[350px] rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            {guides.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <TourGuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No tour guides found for "{searchQuery}". Try another city!
                </p>
              </div>
            )}
          </>
        )}
      </main>
      <Chatbot />
    </div>
  )
}
