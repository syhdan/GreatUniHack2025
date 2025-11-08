"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Star, X, Mail, Phone, Globe, Award, Calendar, Compass, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const mockGuides = [
  {
    id: 1,
    name: "Maria Garcia",
    location: "Barcelona",
    rating: 4.9,
    reviews: 127,
    specialties: ["Architecture", "Food Tours"],
    image: "/tour-guide-woman.jpg",
    price: "$45/hour",
    bio: "Born and raised in Barcelona, I've been sharing my city's secrets with travelers for over 8 years. My passion is showing the authentic Barcelona beyond the tourist hotspots.",
    languages: ["Spanish", "English", "Catalan"],
    experience: "8 years",
    email: "maria@guideco.com",
    phone: "+34 612 345 678",
    website: "mariabarcellonatours.com",
    tours: ["Gaudi Architecture Tour", "Tapas & Wine Experience", "Gothic Quarter Walking Tour"],
    availability: "Mon-Sat, 9 AM - 6 PM",
  },
  {
    id: 2,
    name: "John Smith",
    location: "New York",
    rating: 4.8,
    reviews: 89,
    specialties: ["History", "Art"],
    image: "/tour-guide-man.jpg",
    price: "$60/hour",
    bio: "History professor turned tour guide. I love bringing NYC's rich history to life through engaging storytelling and lesser-known facts.",
    languages: ["English", "French"],
    experience: "5 years",
    email: "john@guideco.com",
    phone: "+1 212 555 0123",
    website: "nychistorytours.com",
    tours: ["American History Tour", "Museum Mile Experience", "Brooklyn Bridge & Beyond"],
    availability: "Tue-Sun, 10 AM - 5 PM",
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    location: "Tokyo",
    rating: 5.0,
    reviews: 203,
    specialties: ["Culture", "Food"],
    image: "/asian-tour-guide.jpg",
    price: "$50/hour",
    bio: "Tokyo native with a deep love for Japanese culture and cuisine. I specialize in creating unforgettable culinary journeys through Tokyo's diverse neighborhoods.",
    languages: ["Japanese", "English", "Mandarin"],
    experience: "10 years",
    email: "yuki@guideco.com",
    phone: "+81 3 1234 5678",
    website: "tokyofoodadventures.jp",
    tours: ["Traditional Tea Ceremony", "Tsukiji Market Food Tour", "Shibuya Night Experience"],
    availability: "Daily, 8 AM - 8 PM",
  },
  {
    id: 4,
    name: "Sophie Laurent",
    location: "Paris",
    rating: 4.9,
    reviews: 156,
    specialties: ["Art", "History"],
    image: "/french-tour-guide.jpg",
    price: "$55/hour",
    bio: "Art historian with a passion for Paris. I've spent years studying the masterpieces in our museums and love sharing their stories with curious travelers.",
    languages: ["French", "English", "Italian"],
    experience: "7 years",
    email: "sophie@guideco.com",
    phone: "+33 1 42 34 56 78",
    website: "parisartwalks.fr",
    tours: ["Louvre Masterpieces", "Impressionist Paris", "Montmartre Artists Tour"],
    availability: "Wed-Sun, 9 AM - 6 PM",
  },
  {
    id: 5,
    name: "Carlos Rodriguez",
    location: "Barcelona",
    rating: 4.7,
    reviews: 92,
    specialties: ["Beach Tours", "Nightlife"],
    image: "/spanish-tour-guide.jpg",
    price: "$40/hour",
    bio: "Young, energetic guide who knows Barcelona's best beaches and nightlife spots. Perfect for travelers looking to experience the city's vibrant social scene.",
    languages: ["Spanish", "English", "Portuguese"],
    experience: "4 years",
    email: "carlos@guideco.com",
    phone: "+34 623 456 789",
    website: "barcelonabeachlife.com",
    tours: ["Beach & Waterfront Tour", "Nightlife Experience", "Barcelona Bike Tour"],
    availability: "Daily, 2 PM - 11 PM",
  },
  {
    id: 6,
    name: "Emma Wilson",
    location: "London",
    rating: 4.8,
    reviews: 134,
    specialties: ["History", "Museums"],
    image: "/british-tour-guide.jpg",
    price: "$50/hour",
    bio: "Former museum curator with encyclopedic knowledge of London's history. I make the past come alive through captivating stories and insider access.",
    languages: ["English", "German"],
    experience: "6 years",
    email: "emma@guideco.com",
    phone: "+44 20 7123 4567",
    website: "londonheritagetours.co.uk",
    tours: ["Royal London Tour", "British Museum Highlights", "Victorian London Walk"],
    availability: "Mon-Fri, 10 AM - 4 PM",
  },
]

export default function FindGuidePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredGuides, setFilteredGuides] = useState(mockGuides)
  const [selectedGuide, setSelectedGuide] = useState<(typeof mockGuides)[0] | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const router = useRouter()

  const handleSearch = () => {
    setHasSearched(true)
    if (searchQuery.trim() === "") {
      setFilteredGuides(mockGuides)
    } else {
      const filtered = mockGuides.filter((guide) => guide.location.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredGuides(filtered)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 px-4 py-12">
        <div className="max-w-6xl w-full mx-auto">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Guide</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search for local tour guides in your destination and discover authentic experiences
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search location (e.g., Barcelona, Tokyo, Paris...)"
                  className="pl-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button size="lg" onClick={handleSearch} className="h-12 px-6">
                Search
              </Button>
            </div>
          </div>

          {/* Search Results */}
          {hasSearched && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {filteredGuides.length > 0
                  ? searchQuery
                    ? `Tour Guides in ${searchQuery}`
                    : "All Tour Guides"
                  : `No guides found in ${searchQuery}`}
              </h2>

              {filteredGuides.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGuides.map((guide) => (
                    <div
                      key={guide.id}
                      onClick={() => setSelectedGuide(guide)}
                      className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <img
                            src={guide.image || "/placeholder.svg"}
                            alt={guide.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-card-foreground">{guide.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                              <MapPin className="w-4 h-4" />
                              <span>{guide.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium text-sm">{guide.rating}</span>
                              <span className="text-sm text-muted-foreground">({guide.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {guide.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="text-xs bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-lg text-primary">{guide.price}</span>
                          <Button size="sm">View Profile</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-xl">
                  <p className="text-muted-foreground">
                    Try searching for Barcelona, Tokyo, Paris, New York, or London
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          © 2025 Guide Connect. Connecting travelers with local experiences.
        </div>
      </footer>

      {/* Profile Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Guide Profile</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedGuide(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6">
              {/* Profile Header */}
              <div className="flex items-start gap-6 mb-6">
                <img
                  src={selectedGuide.image || "/placeholder.svg"}
                  alt={selectedGuide.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{selectedGuide.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedGuide.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{selectedGuide.rating}</span>
                      <span className="text-sm text-muted-foreground">({selectedGuide.reviews} reviews)</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">{selectedGuide.experience} experience</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedGuide.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">About Me</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedGuide.bio}</p>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGuide.languages.map((language, index) => (
                    <span key={index} className="text-sm bg-secondary px-3 py-1 rounded-full">
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tours Offered */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Tours Offered</h4>
                <ul className="space-y-2">
                  {selectedGuide.tours.map((tour, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <Compass className="w-4 h-4 text-primary" />
                      <span>{tour}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Availability</h4>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedGuide.availability}</span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{selectedGuide.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{selectedGuide.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <span>{selectedGuide.website}</span>
                  </div>
                </div>
              </div>

              {/* Pricing and Book Button */}
              <div className="border-t pt-6 flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Starting from</div>
                  <div className="text-3xl font-bold text-primary">{selectedGuide.price}</div>
                </div>
                <Button
                  size="lg"
                  className="px-8"
                  onClick={() => {
                    router.push(`/booking?guideId=${selectedGuide.id}`)
                  }}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
