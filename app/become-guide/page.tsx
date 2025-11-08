"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function BecomeGuidePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    languages: "",
    experience: "",
    specialties: "",
    hourlyRate: "",
    bio: "",
    certifications: "",
    website: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    alert("Application submitted successfully! We will review your profile and get back to you soon.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl w-full mx-auto">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a Tour Guide</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your local expertise and earn money by showing travelers the best of your city
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-card border rounded-xl p-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location (City, Country) *</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Barcelona, Spain"
                    required
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Professional Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="languages">Languages Spoken *</Label>
                  <Input
                    id="languages"
                    name="languages"
                    placeholder="e.g., English, Spanish, French"
                    required
                    value={formData.languages}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Separate languages with commas</p>
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Input
                    id="experience"
                    name="experience"
                    placeholder="e.g., 5 years"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="specialties">Specialties *</Label>
                  <Input
                    id="specialties"
                    name="specialties"
                    placeholder="e.g., History, Architecture, Food Tours, Culture"
                    required
                    value={formData.specialties}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Separate specialties with commas</p>
                </div>

                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate (USD) *</Label>
                  <Input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    placeholder="e.g., 45"
                    required
                    value={formData.hourlyRate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">About You *</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about yourself, your background, and what makes you a great guide..."
                    rows={5}
                    required
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Qualifications */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Skills & Qualifications</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="certifications">Certifications & Licenses</Label>
                  <Textarea
                    id="certifications"
                    name="certifications"
                    placeholder="List any relevant certifications, licenses, or qualifications..."
                    rows={3}
                    value={formData.certifications}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website or Social Media</Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="photo">Profile Photo</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                    <input type="file" id="photo" className="hidden" accept="image/*" />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full">
                Submit Application
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-4">
                By submitting this form, you agree to our terms and conditions
              </p>
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
