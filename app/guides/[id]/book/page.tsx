"use client"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AppHeader } from "@/components/app-header"
import { useState, useEffect } from "react"
import type { TourGuide } from "@/lib/types"

export default function BookGuidePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [guideId] = useState(params.id as string)
  const [guide, setGuide] = useState<TourGuide | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  console.log("[v0] BookGuidePage mounted, guideId:", guideId, "user:", user)

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    arrivalTime: "",
    meetupLocation: "",
    interestedTours: [] as string[],
    additionalNotes: "",
  })

  useEffect(() => {
    console.log("[v0] useEffect running, user:", user)
    // Redirect if not logged in
    if (!user) {
      console.log("[v0] No user, redirecting to login")
      router.push(`/login?redirect=/guides/${guideId}/book`)
      return
    }

    const fetchGuide = async () => {
      console.log("[v0] Fetching guide:", guideId)
      try {
        const response = await fetch(`/api/guides/${guideId}`)
        console.log("[v0] API response status:", response.status)
        if (response.ok) {
          const data = await response.json()
          console.log("[v0] Guide data:", data)
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
  }, [guideId, user, router])

  const handleTourToggle = (tour: string) => {
    setFormData((prev) => ({
      ...prev,
      interestedTours: prev.interestedTours.includes(tour)
        ? prev.interestedTours.filter((t) => t !== tour)
        : [...prev.interestedTours, tour],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guideId,
          ...formData,
        }),
      })

      if (response.ok) {
        alert("Booking request submitted successfully! The guide will contact you soon.")
        router.push(`/guides/${guideId}`)
      } else {
        alert("Failed to submit booking. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting booking:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  console.log("[v0] Render state - isLoading:", isLoading, "guide:", guide)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
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

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <div className="container mx-auto px-6 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Book {guide.name}</h1>
          <p className="text-muted-foreground text-lg">
            Fill out the form below to request a booking with your tour guide
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-base font-semibold">
                Start Date *
              </Label>
              <Input
                id="startDate"
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-base font-semibold">
                End Date *
              </Label>
              <Input
                id="endDate"
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="text-base"
              />
            </div>
          </div>

          {/* Arrival Time */}
          <div className="space-y-2">
            <Label htmlFor="arrivalTime" className="text-base font-semibold">
              Arrival Time *
            </Label>
            <Input
              id="arrivalTime"
              type="time"
              required
              value={formData.arrivalTime}
              onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
              className="text-base"
            />
          </div>

          {/* Meetup Location */}
          <div className="space-y-2">
            <Label htmlFor="meetupLocation" className="text-base font-semibold">
              Meetup Location *
            </Label>
            <Input
              id="meetupLocation"
              type="text"
              required
              placeholder="e.g., Hotel lobby, Central train station"
              value={formData.meetupLocation}
              onChange={(e) => setFormData({ ...formData, meetupLocation: e.target.value })}
              className="text-base"
            />
          </div>

          {/* Interested Tours */}
          {guide.tours.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base font-semibold">Interested Tours</Label>
              <p className="text-sm text-muted-foreground">Select the tours you'd like to experience</p>
              <div className="space-y-2">
                {guide.tours.map((tour) => (
                  <div key={tour} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`tour-${tour}`}
                      checked={formData.interestedTours.includes(tour)}
                      onChange={() => handleTourToggle(tour)}
                      className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <Label htmlFor={`tour-${tour}`} className="text-base cursor-pointer">
                      {tour}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="additionalNotes" className="text-base font-semibold">
              Additional Notes
            </Label>
            <Textarea
              id="additionalNotes"
              placeholder="Any special requests or information the guide should know..."
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              rows={5}
              className="text-base resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-2xl font-bold text-blue-500">${guide.price}/hour</p>
              <p className="text-sm text-muted-foreground">Final price will be confirmed by the guide</p>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-lg"
            >
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
