export interface TourGuide {
  id: string
  name: string
  email: string
  city: string
  country: string
  rating: number
  reviews: number
  price: number
  image: string
  specialties: string[]
  languages: string[]
  experience: string
  bio: string
  tours: string[]
  availability: string
  yearsExperience: number
}

export interface NewGuideApplication {
  name: string
  email: string
  location: string
  languages: string
  specialty: string
  experience: string
  rate: string
}

export interface Booking {
  id: string
  guideId: string
  userId: string
  userName: string
  userEmail: string
  guideName: string
  startDate: string
  endDate: string
  arrivalTime: string
  meetupLocation: string
  interestedTours: string[]
  additionalNotes: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

export interface NewBookingRequest {
  guideId: string
  startDate: string
  endDate: string
  arrivalTime: string
  meetupLocation: string
  interestedTours: string[]
  additionalNotes: string
}
