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
import { MotionDiv } from "@/components/motion"

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="container mx-auto px-4 py-16">
        <MotionDiv
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Find Your Perfect Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Search for local tour guides in your destination and discover authentic experiences.
          </p>
        </MotionDiv>

        <div className="flex gap-2 max-w-2xl mx-auto mb-16">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter a city name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-12 h-12 text-base"
            />
          </div>
          <Button onClick={handleSearch} className="btn btn-primary">
            Search
          </Button>
        </div>

        {isLoading ? (
          <MotionDiv
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[...Array(6)].map((_, i) => (
              <MotionDiv key={i} variants={itemVariants}>
                <Skeleton className="h-[420px] rounded-2xl" />
              </MotionDiv>
            ))}
          </MotionDiv>
        ) : (
          <>
            {guides.length > 0 ? (
              <MotionDiv
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {guides.map((guide) => (
                  <MotionDiv key={guide.id} variants={itemVariants}>
                    <TourGuideCard guide={guide} />
                  </MotionDiv>
                ))}
              </MotionDiv>
            ) : (
              <div className="text-center py-16">
                <p className="text-2xl text-muted-foreground">
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
