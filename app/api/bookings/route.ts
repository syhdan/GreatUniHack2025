import { NextResponse } from "next/server"
import { createBooking } from "@/lib/bookings-data"
import { getGuideById } from "@/lib/guides-data"
import type { Booking, NewBookingRequest } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const body: NewBookingRequest = await request.json()

    // Get guide details
    const guide = getGuideById(body.guideId)
    if (!guide) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 })
    }

    // In a real app, you'd get user info from session/auth
    // For now, we'll use mock user data
    const userId = "user-" + Date.now()
    const userName = "Guest User"
    const userEmail = "guest@example.com"

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      guideId: body.guideId,
      userId,
      userName,
      userEmail,
      guideName: guide.name,
      startDate: body.startDate,
      endDate: body.endDate,
      arrivalTime: body.arrivalTime,
      meetupLocation: body.meetupLocation,
      interestedTours: body.interestedTours,
      additionalNotes: body.additionalNotes,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    const booking = createBooking(newBooking)
    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
