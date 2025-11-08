import { NextResponse } from "next/server"
import { getAllGuides, getGuidesByCity, addGuide } from "@/lib/guides-data"
import type { TourGuide } from "@/lib/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")

  if (city) {
    const guides = getGuidesByCity(city)
    return NextResponse.json(guides)
  }

  const guides = getAllGuides()
  return NextResponse.json(guides)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Generate a unique ID
    const id = Date.now().toString()

    // Parse location into city and country
    const [city, country] = body.location.split(",").map((s: string) => s.trim())

    // Parse languages from comma-separated string
    const languages = body.languages.split(",").map((s: string) => s.trim())

    // Parse specialties from comma-separated string
    const specialties = body.specialty.split(",").map((s: string) => s.trim())

    const newGuide: TourGuide = {
      id,
      name: body.name,
      email: body.email,
      city: city || body.location,
      country: country || "",
      rating: 0,
      reviews: 0,
      price: Number.parseInt(body.rate),
      image: "/placeholder.svg?height=400&width=400",
      specialties,
      languages,
      experience: body.experience,
      bio: body.experience,
      tours: [],
      availability: "By appointment",
      yearsExperience: 0,
    }

    const guide = addGuide(newGuide)
    return NextResponse.json(guide, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create guide" }, { status: 500 })
  }
}
