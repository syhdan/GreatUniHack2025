"use client"

import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { MapPin, Star, User, Calendar } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import type { TourGuide } from "@/lib/types"
import { AppHeader } from "@/components/app-header"

export default function GuideProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [guideId] = useState(params.id as string)
  const [guide, setGuide] = useState<TourGuide | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await fetch(`/api/guides/${guideId}`)
        if (response.ok) {
          const data = await response.json()
          setGuide(data)
        } else {
          console.error("Failed to fetch guide")
        }
      } catch (error) {
        console.error("Error fetching guide:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGuide()
  }, [guideId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading guide profile...</p>
      </div>
    )
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Guide not found</p>
      </div>
    )
  }

  const handleBookNow = () => {
    if (!user) {
      router.push(`/login?redirect=/guides/${guideId}/book`)
    } else {
      router.push(`/guides/${guideId}/book`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Profile Content */}
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="flex gap-6 mb-8">
          <div className="relative h-40 w-40 rounded-full overflow-hidden flex-shrink-0">
            <Image src={guide.image || "/placeholder.svg"} alt={guide.name} fill className="object-cover" />
          </div>

          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-3">{guide.name}</h2>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{guide.city}</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-lg">{guide.rating}</span>
                <span className="text-muted-foreground">({guide.reviews} reviews)</span>
              </div>
              {guide.yearsExperience > 0 && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-muted-foreground">{guide.yearsExperience} years experience</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {guide.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* About Me */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4">About Me</h3>
          <p className="text-muted-foreground leading-relaxed text-lg">{guide.bio}</p>
        </section>

        {/* Languages */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Languages</h3>
          <div className="flex items-center gap-3 flex-wrap">
            {guide.languages.map((language) => (
              <span
                key={language}
                className="bg-yellow-300 dark:bg-yellow-600 text-black dark:text-black px-5 py-2 rounded-full text-base font-medium"
              >
                {language}
              </span>
            ))}
          </div>
        </section>

        {/* Tours Offered */}
        {guide.tours.length > 0 && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Tours Offered</h3>
            <div className="space-y-3">
              {guide.tours.map((tour) => (
                <div key={tour} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center flex-shrink-0">
                    <div className="h-4 w-4 rounded-full border-2 border-blue-500" />
                  </div>
                  <span className="text-lg">{tour}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Availability */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Availability</h3>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span className="text-lg">{guide.availability}</span>
          </div>
        </section>

        {/* Booking Section */}
        <div className="bg-card border rounded-xl p-6 flex items-center justify-between">
          <div>
            <div className="mb-1">
              <span className="text-3xl font-bold text-blue-500">${guide.price}</span>
              <span className="text-muted-foreground text-lg">/hour</span>
            </div>
            <p className="text-muted-foreground">Book your authentic local experience</p>
          </div>
          <Button
            onClick={handleBookNow}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-lg"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}
