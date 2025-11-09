"use client"

import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { MapPin, Star, User, Calendar, Languages, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import type { TourGuide } from "@/lib/types"
import { AppHeader } from "@/components/app-header"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export default function GuideProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const guideId = params.id as string
  const [guide, setGuide] = useState<TourGuide | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGuide = async () => {
      if (!guideId) return
      setIsLoading(true)
      try {
        const response = await fetch(`/api/guides/${guideId}`)
        if (response.ok) {
          const data = await response.json()
          setGuide(data)
        } else {
          console.error("Failed to fetch guide")
          setGuide(null)
        }
      } catch (error) {
        console.error("Error fetching guide:", error)
        setGuide(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGuide()
  }, [guideId])

  const handleBookNow = () => {
    if (!user) {
      router.push(`/login?redirect=/guides/${guideId}/book`)
    } else {
      router.push(`/guides/${guideId}/book`)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <Skeleton className="h-40 w-40 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-8 w-1/4" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold">Guide not found</h2>
          <p className="text-muted-foreground mt-2">
            The guide you are looking for does not exist.
          </p>
          <Button onClick={() => router.push("/guides")} className="mt-6">
            Back to Guides
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="relative h-40 w-40 rounded-full overflow-hidden flex-shrink-0">
            <Image src={guide.image || "/placeholder-user.jpg"} alt={guide.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{guide.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{guide.city}, {guide.country}</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="font-bold text-lg">{guide.rating}</span>
                <span className="text-muted-foreground">({guide.reviews} reviews)</span>
              </div>
              {guide.yearsExperience > 0 && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-5 w-5" />
                  <span>{guide.yearsExperience} years of experience</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {guide.specialties.map((specialty) => (
                <Badge key={specialty}>{specialty}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p className="text-muted-foreground leading-relaxed">
                {guide.bio || "No biography provided."}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Languages</h2>
              <div className="flex items-center gap-2 flex-wrap">
                {guide.languages.map((language) => (
                  <Badge key={language} variant="secondary">{language}</Badge>
                ))}
              </div>
            </section>

            {guide.tours?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Tours Offered</h2>
                <ul className="space-y-2 text-muted-foreground">
                  {guide.tours.map((tour) => (
                    <li key={tour} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <span>{tour}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Book a Tour</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-primary">${guide.price}</span>
                <span className="text-muted-foreground">/hour</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Calendar className="h-5 w-5" />
                <span>{guide.availability}</span>
              </div>
              <Button onClick={handleBookNow} className="w-full" size="lg">
                Book Now
              </Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
