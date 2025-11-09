"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Star } from "lucide-react"
import Image from "next/image"
import type { TourGuide } from "@/lib/types"
import { AppHeader } from "@/components/app-header"
import { Chatbot } from "@/components/chatbot"

export default function GuidesPage() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [guides, setGuides] = useState<TourGuide[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const filteredGuides =
    searchPerformed && searchQuery
      ? guides.filter((guide) => guide.city.toLowerCase().includes(searchQuery.toLowerCase()))
      : guides.slice(0, 3) // Show top 3 popular guides by default

  const handleSearch = () => {
    setSearchPerformed(true)
    if (searchQuery) {
      fetchGuides(searchQuery)
    } else {
      fetchGuides()
    }
  }

  const handleViewProfile = (guideId: string) => {
    router.push(`/guides/${guideId}`)
  }

  const displayCity = searchPerformed && searchQuery ? searchQuery : "Popular Destinations"

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Guide</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto">
            Search for local tour guides in your destination and discover authentic experiences
          </p>

          <div className="flex gap-3 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter city name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-blue-200 dark:border-blue-800 rounded-lg focus:outline-none focus:border-blue-400 dark:focus:border-blue-600 bg-background"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg h-auto rounded-lg"
            >
              Search
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            {searchPerformed && searchQuery ? `Tour Guides in ${searchQuery}` : "Popular Tour Guides"}
          </h2>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading guides...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {filteredGuides.map((guide) => (
              <div key={guide.id} className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border">
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={guide.image || "/placeholder.svg"} alt={guide.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{guide.name}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{guide.city}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{guide.rating}</span>
                      <span className="text-muted-foreground text-sm">({guide.reviews} reviews)</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      {guide.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-blue-500">${guide.price}</span>
                        <span className="text-muted-foreground">/hour</span>
                      </div>
                      <Button
                        onClick={() => handleViewProfile(guide.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && searchPerformed && filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No tour guides found in {searchQuery}. Try another city!</p>
          </div>
        )}
      </main>
      <Chatbot />
    </div>
  )
}
