"use client"

import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { X, MapPin, Star, User, Calendar, Moon, Sun } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

const tourGuidesData = {
  "1": {
    id: "1",
    name: "Maria Garcia",
    city: "Barcelona",
    rating: 4.9,
    reviews: 127,
    experience: 8,
    price: 45,
    image: "/woman-tour-guide.jpg",
    specialties: ["Architecture", "Food Tours"],
    bio: "Born and raised in Barcelona, I've been sharing my city's secrets with travelers for over 8 years. My passion is showing the authentic Barcelona beyond the tourist hotspots.",
    languages: ["Spanish", "English", "Catalan"],
    tours: ["Gaudi Architecture Tour", "Tapas & Wine Experience", "Gothic Quarter Walking Tour"],
    availability: "Mon-Sat, 9 AM - 6 PM",
  },
  "2": {
    id: "2",
    name: "Carlos Rodriguez",
    city: "Barcelona",
    rating: 4.7,
    reviews: 92,
    experience: 5,
    price: 40,
    image: "/man-tour-guide.jpg",
    specialties: ["Beach Tours", "Nightlife"],
    bio: "As a Barcelona native with 5 years of guiding experience, I specialize in showing visitors the vibrant beach culture and nightlife scene that makes this city special.",
    languages: ["Spanish", "English", "Portuguese"],
    tours: ["Beach & Port Tour", "Barcelona Nightlife Experience", "Coastal Walk & Seafood"],
    availability: "Tue-Sun, 10 AM - 10 PM",
  },
  "3": {
    id: "3",
    name: "Marie Laurent",
    city: "Paris",
    rating: 4.9,
    reviews: 127,
    experience: 10,
    price: 75,
    image: "/french-tour-guide.jpg",
    specialties: ["Art & History", "Museums"],
    bio: "With a degree in Art History and 10 years of experience, I bring Paris's rich cultural heritage to life through engaging stories and expert insights.",
    languages: ["French", "English", "Italian"],
    tours: ["Louvre Masterpieces Tour", "Impressionist Art Walk", "Hidden Paris Museums"],
    availability: "Wed-Sun, 9 AM - 5 PM",
  },
  "4": {
    id: "4",
    name: "James Wilson",
    city: "London",
    rating: 4.8,
    reviews: 98,
    experience: 7,
    price: 65,
    image: "/british-tour-guide.jpg",
    specialties: ["Historical Tours", "Royal Palaces"],
    bio: "London is steeped in history, and I love sharing centuries of royal heritage and historical tales with curious travelers from around the world.",
    languages: ["English", "Spanish"],
    tours: ["Royal London Tour", "Westminster & Parliament Walk", "Tower of London Experience"],
    availability: "Mon-Sat, 8 AM - 6 PM",
  },
  "5": {
    id: "5",
    name: "Yuki Tanaka",
    city: "Tokyo",
    rating: 5.0,
    reviews: 156,
    experience: 12,
    price: 80,
    image: "/asian-tour-guide.jpg",
    specialties: ["Cultural Experience", "Temples"],
    bio: "I've dedicated over 12 years to helping visitors discover the perfect balance of traditional and modern Tokyo, from ancient temples to contemporary culture.",
    languages: ["Japanese", "English", "Mandarin"],
    tours: ["Traditional Temple Tour", "Shibuya & Harajuku Culture", "Tokyo Food Adventure"],
    availability: "Daily, 7 AM - 7 PM",
  },
}

export default function GuideProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const guideId = params.id as string
  const guide = tourGuidesData[guideId as keyof typeof tourGuidesData]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Guide not found</p>
      </div>
    )
  }

  const handleBookNow = () => {
    if (!user) {
      router.push(`/login?redirect=/guides/${guideId}/book`)
    } else {
      // In a real app, this would go to a booking page
      alert("Booking functionality coming soon!")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Guide Profile</h1>
          <div className="flex items-center gap-2">
            {mounted && (
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            )}
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

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
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-muted-foreground">{guide.experience} years experience</span>
              </div>
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
