"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CalendarIcon, Clock, MapPin, User } from "lucide-react"
import Link from "next/link"
import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"

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
  },
]

function BookingContent() {
  const searchParams = useSearchParams()
  const guideId = searchParams.get("guideId")
  const guide = mockGuides.find((g) => g.id === Number(guideId))

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [arrivalTime, setArrivalTime] = useState("")
  const [meetupLocation, setMeetupLocation] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Booking request submitted! The guide will contact you soon.")
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Guide not found</h2>
          <Link href="/find-guide">
            <Button>Back to Find Guide</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 px-4 py-12">
        <div className="max-w-4xl w-full mx-auto">
          {/* Back Button */}
          <Link href="/find-guide">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Guides
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Book Your Tour</h1>
            <p className="text-lg text-muted-foreground">Complete the details below to book your experience</p>
          </div>

          {/* Guide Info Card */}
          <div className="bg-card border rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <img
                src={guide.image || "/placeholder.svg"}
                alt={guide.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{guide.name}</h2>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{guide.location}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {guide.specialties.map((specialty, index) => (
                    <span key={index} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Starting from</div>
                <div className="text-3xl font-bold text-primary">{guide.price}</div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-6">Tour Details</h3>

            {/* Date Selection */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-base font-semibold flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Start Date
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-base font-semibold flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  End Date
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
            </div>

            {/* Arrival Time */}
            <div className="space-y-2 mb-6">
              <Label htmlFor="arrival-time" className="text-base font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Arrival Time
              </Label>
              <Input
                id="arrival-time"
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                required
                className="h-12"
              />
              <p className="text-sm text-muted-foreground">What time will you be arriving at the meetup location?</p>
            </div>

            {/* Meetup Location */}
            <div className="space-y-2 mb-6">
              <Label htmlFor="meetup-location" className="text-base font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Meetup Location
              </Label>
              <Input
                id="meetup-location"
                type="text"
                placeholder="e.g., Main entrance of Central Park, Hotel lobby..."
                value={meetupLocation}
                onChange={(e) => setMeetupLocation(e.target.value)}
                required
                className="h-12"
              />
              <p className="text-sm text-muted-foreground">Where would you like to meet your guide?</p>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2 mb-6">
              <Label htmlFor="notes" className="text-base font-semibold flex items-center gap-2">
                <User className="w-4 h-4" />
                Additional Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Any special requests, interests, or questions for your guide..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-32 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Link href="/find-guide" className="flex-1">
                <Button type="button" variant="outline" size="lg" className="w-full bg-transparent">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" size="lg" className="flex-1">
                Confirm Booking
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          © 2025 Guide Connect. Connecting travelers with local experiences.
        </div>
      </footer>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  )
}
