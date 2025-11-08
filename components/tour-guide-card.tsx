"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Languages } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface TourGuide {
  id: string
  name: string
  location: string
  languages: string[]
  rating: number
  reviews: number
  price: number
  image: string
  specialty: string
}

export function TourGuideCard({ guide }: { guide: TourGuide }) {
  const { user } = useAuth()
  const router = useRouter()
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const handleBook = () => {
    if (!user) {
      setShowLoginDialog(true)
    } else {
      // Proceed with booking
      alert(`Booking tour with ${guide.name}!`)
    }
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-square relative">
          <Image src={guide.image || "/placeholder.svg"} alt={guide.name} fill className="object-cover" />
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{guide.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground gap-1">
                <MapPin className="h-3 w-3" />
                {guide.location}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{guide.rating}</span>
              <span className="text-sm text-muted-foreground">({guide.reviews})</span>
            </div>
          </div>

          <Badge variant="secondary" className="mb-3">
            {guide.specialty}
          </Badge>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Languages className="h-4 w-4" />
            <span>{guide.languages.join(", ")}</span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">${guide.price}</span>
            <span className="text-sm text-muted-foreground">/hour</span>
          </div>
          <Button onClick={handleBook}>Book Now</Button>
        </CardFooter>
      </Card>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to book a tour guide. Please log in or create an account to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowLoginDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => router.push("/login")}>Log in</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
