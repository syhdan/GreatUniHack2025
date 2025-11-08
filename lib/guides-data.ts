import type { TourGuide } from "./types"

// In-memory storage for tour guides
const guides: TourGuide[] = [
  {
    id: "1",
    name: "Maria Garcia",
    email: "maria@example.com",
    city: "Barcelona",
    country: "Spain",
    rating: 4.9,
    reviews: 127,
    price: 45,
    image: "/woman-tour-guide.jpg",
    specialties: ["Architecture", "Food Tours"],
    languages: ["Spanish", "English", "Catalan"],
    experience:
      "Born and raised in Barcelona, I've been sharing my city's secrets with travelers for over 8 years. My passion is showing the authentic Barcelona beyond the tourist hotspots.",
    bio: "Born and raised in Barcelona, I've been sharing my city's secrets with travelers for over 8 years. My passion is showing the authentic Barcelona beyond the tourist hotspots.",
    tours: ["Gaudi Architecture Tour", "Tapas & Wine Experience", "Gothic Quarter Walking Tour"],
    availability: "Mon-Sat, 9 AM - 6 PM",
    yearsExperience: 8,
  },
  {
    id: "2",
    name: "Carlos Rodriguez",
    email: "carlos@example.com",
    city: "Barcelona",
    country: "Spain",
    rating: 4.7,
    reviews: 92,
    price: 40,
    image: "/man-tour-guide.jpg",
    specialties: ["Beach Tours", "Nightlife"],
    languages: ["Spanish", "English"],
    experience:
      "Local Barcelona guide specializing in beach culture and nightlife. 5 years of experience showing visitors the best of Barcelona's coastal lifestyle.",
    bio: "Local Barcelona guide specializing in beach culture and nightlife. 5 years of experience showing visitors the best of Barcelona's coastal lifestyle.",
    tours: ["Barcelona Beach Tour", "Nightlife Experience", "Coastal Walking Tour"],
    availability: "Tue-Sun, 10 AM - 11 PM",
    yearsExperience: 5,
  },
  {
    id: "3",
    name: "Marie Laurent",
    email: "marie@example.com",
    city: "Paris",
    country: "France",
    rating: 4.9,
    reviews: 127,
    price: 75,
    image: "/french-tour-guide.jpg",
    specialties: ["Art & History", "Museums"],
    languages: ["French", "English", "German"],
    experience:
      "Art historian with 10 years of experience guiding tours through Paris's world-famous museums and historic sites. Passionate about bringing French history to life.",
    bio: "Art historian with 10 years of experience guiding tours through Paris's world-famous museums and historic sites. Passionate about bringing French history to life.",
    tours: ["Louvre Masterpieces Tour", "Versailles Palace Tour", "Latin Quarter History Walk"],
    availability: "Wed-Sun, 9 AM - 5 PM",
    yearsExperience: 10,
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@example.com",
    city: "London",
    country: "UK",
    rating: 4.8,
    reviews: 98,
    price: 65,
    image: "/british-tour-guide.jpg",
    specialties: ["Historical Tours", "Royal Palaces"],
    languages: ["English", "French"],
    experience:
      "British history enthusiast with 7 years of experience. Specializing in royal history and iconic London landmarks.",
    bio: "British history enthusiast with 7 years of experience. Specializing in royal history and iconic London landmarks.",
    tours: ["Royal London Tour", "Tower of London Experience", "Westminster Abbey Visit"],
    availability: "Mon-Fri, 9 AM - 5 PM",
    yearsExperience: 7,
  },
  {
    id: "5",
    name: "Yuki Tanaka",
    email: "yuki@example.com",
    city: "Tokyo",
    country: "Japan",
    rating: 5.0,
    reviews: 156,
    price: 80,
    image: "/asian-tour-guide.jpg",
    specialties: ["Cultural Experience", "Temples"],
    languages: ["Japanese", "English", "Mandarin"],
    experience:
      "Tokyo native with 12 years of guiding experience. Expert in Japanese culture, traditions, and temple history.",
    bio: "Tokyo native with 12 years of guiding experience. Expert in Japanese culture, traditions, and temple history.",
    tours: ["Temple & Shrine Tour", "Traditional Tokyo Experience", "Samurai History Walk"],
    availability: "Mon-Sat, 8 AM - 6 PM",
    yearsExperience: 12,
  },
]

export function getAllGuides(): TourGuide[] {
  return guides
}

export function getGuideById(id: string): TourGuide | undefined {
  return guides.find((guide) => guide.id === id)
}

export function getGuidesByCity(city: string): TourGuide[] {
  return guides.filter((guide) => guide.city.toLowerCase().includes(city.toLowerCase()))
}

export function addGuide(guide: TourGuide): TourGuide {
  guides.push(guide)
  return guide
}

export function updateGuide(id: string, updates: Partial<TourGuide>): TourGuide | undefined {
  const index = guides.findIndex((guide) => guide.id === id)
  if (index === -1) return undefined

  guides[index] = { ...guides[index], ...updates }
  return guides[index]
}
