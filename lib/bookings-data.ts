import type { Booking } from "./types"

// In-memory bookings storage
const bookings: Booking[] = []

export function getAllBookings(): Booking[] {
  return bookings
}

export function getBookingById(id: string): Booking | undefined {
  return bookings.find((booking) => booking.id === id)
}

export function getBookingsByGuideId(guideId: string): Booking[] {
  return bookings.filter((booking) => booking.guideId === guideId)
}

export function getBookingsByUserId(userId: string): Booking[] {
  return bookings.filter((booking) => booking.userId === userId)
}

export function createBooking(booking: Booking): Booking {
  bookings.push(booking)
  return booking
}

export function updateBookingStatus(id: string, status: "pending" | "confirmed" | "cancelled"): Booking | undefined {
  const booking = bookings.find((b) => b.id === id)
  if (booking) {
    booking.status = status
  }
  return booking
}
