"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Languages, ArrowRight } from "lucide-react"
import type { TourGuide } from "@/lib/types"

export function TourGuideCard({ guide }: { guide: TourGuide }) {
  return (
    <Link href={`/guides/${guide.id}`}>
      <Card className="overflow-hidden group h-full flex flex-col">
        <div className="aspect-video relative">
          <Image src={guide.image || "/placeholder.svg"} alt={guide.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h3 className="font-bold text-xl text-white">{guide.name}</h3>
            <div className="flex items-center text-sm text-white/80 gap-1">
              <MapPin className="h-4 w-4" />
              {guide.city}
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span>{guide.rating}</span>
            <span className="text-muted-foreground">({guide.reviews} reviews)</span>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {guide.specialties.map((specialty) => (
                <Badge key={specialty}>{specialty}</Badge>
              ))}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Languages className="h-4 w-4" />
              <span>{guide.languages.join(", ")}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-2xl font-bold text-primary">${guide.price}</span>
              <span className="text-sm text-muted-foreground">/hour</span>
            </div>
            <Button asChild className="group">
              <div>
                Book Now
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
