"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ApplyPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [location, setLocation] = useState("")
  const [languages, setLanguages] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [experience, setExperience] = useState("")
  const [rate, setRate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      setShowLoginDialog(true)
    }
  }, [user, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/guides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          location,
          languages,
          specialty,
          experience,
          rate,
        }),
      })

      if (response.ok) {
        alert("Application submitted successfully! Your profile has been added to our tour guides.")
        router.push("/guides")
      } else {
        alert("Failed to submit application. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Become a Tour Guide</CardTitle>
            <CardDescription>
              Share your knowledge and passion for your city with travelers from around the world
            </CardDescription>
          </CardHeader>

          {user ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertDescription>
                    Applying as: <strong>{user.name}</strong> ({user.email})
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Paris, France"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">Languages (comma separated)</Label>
                  <Input
                    id="languages"
                    placeholder="e.g., English, French, Spanish"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty (comma separated)</Label>
                  <Input
                    id="specialty"
                    placeholder="e.g., Art & History, Cultural Experience"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience & Qualifications</Label>
                  <Textarea
                    id="experience"
                    placeholder="Tell us about your experience as a tour guide..."
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate">Hourly Rate (USD)</Label>
                  <Input
                    id="rate"
                    type="number"
                    placeholder="e.g., 50"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </CardContent>
            </form>
          ) : (
            <CardContent>
              <Alert>
                <AlertDescription>Please log in to submit your application.</AlertDescription>
              </Alert>
            </CardContent>
          )}
        </Card>
      </div>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to apply as a tour guide. Please log in or create an account to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/")}>
              Cancel
            </Button>
            <Button onClick={() => router.push("/login")}>Log in</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
