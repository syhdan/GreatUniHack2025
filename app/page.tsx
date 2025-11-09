"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { AppHeader } from "@/components/app-header"
import { ArrowRight, CheckCircle, Globe, Star } from "lucide-react"
import { MotionDiv, MotionH1, MotionP } from "@/components/motion"
import { useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const handleBecomeGuide = () => {
    if (!user) {
      router.push("/login?redirect=/apply")
    } else {
      router.push("/apply")
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        // FIX: Added 'as const' here.
        // This tells TypeScript to treat this as a read-only tuple
        // [number, number, number, number] instead of a generic number[],
        // which satisfies Framer Motion's Easing type.
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main>
        <section ref={heroRef} className="relative h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
          <MotionDiv
            className="absolute inset-0"
            style={{ y }}
          >
            <img
              src="/traveltheworld.png"
              alt="background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </MotionDiv>
          <MotionDiv
            className="relative z-10 max-w-4xl mx-auto px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <MotionH1
              className="text-5xl md:text-7xl font-bold mb-4"
              variants={itemVariants}
            >
              Your Journey, Your Guide
            </MotionH1>
            <MotionP
              className="text-xl md:text-2xl font-semibold text-white/90 mb-4"
              variants={itemVariants}
            >
              When worlds collide, culture comes alive.
            </MotionP>
            <MotionP
              className="text-lg md:text-xl text-white/80 mb-8"
              variants={itemVariants}
            >
              Explore the world with passionate local guides who bring destinations to life.
            </MotionP>
            <MotionDiv
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              variants={itemVariants}
            >
              <Link href="/guides">
                <Button size="lg" className="btn btn-primary w-full sm:w-auto text-lg py-8 px-10">
                  Find a Guide
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="secondary" onClick={handleBecomeGuide} className="btn btn-secondary w-full sm:w-auto text-lg py-8 px-10">
                Become a Guide
              </Button>
            </MotionDiv>
          </MotionDiv>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <MotionDiv
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold">Why Choose CrossWorlds?</h2>
              <p className="text-xl text-muted-foreground mt-4">
                The premier platform for authentic travel experiences.
              </p>
            </MotionDiv>
            <MotionDiv
              className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <MotionDiv className="bg-card p-8 rounded-2xl shadow-lg text-center" variants={itemVariants}>
                <div className="flex justify-center mb-6">
                  <div className="bg-primary/10 text-primary p-5 rounded-full">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Verified Guides</h3>
                <p className="text-muted-foreground">
                  Every guide on our platform is vetted for quality and safety, ensuring you have the best possible experience.
                </p>
              </MotionDiv>
              <MotionDiv className="bg-card p-8 rounded-2xl shadow-lg text-center" variants={itemVariants}>
                <div className="flex justify-center mb-6">
                  <div className="bg-primary/10 text-primary p-5 rounded-full">
                    <Globe className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Global & Local</h3>
                <p className="text-muted-foreground">
                  From bustling cities to remote landscapes, find local experts who know the place like the back of their hand.
                </p>
              </MotionDiv>
              <MotionDiv className="bg-card p-8 rounded-2xl shadow-lg text-center" variants={itemVariants}>
                <div className="flex justify-center mb-6">
                  <div className="bg-primary/10 text-primary p-5 rounded-full">
                    <Star className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Tailored Experiences</h3>
                <p className="text-muted-foreground">
                  Connect with guides to create personalized tours that match your interests, pace, and style.
                </p>
              </MotionDiv>
            </MotionDiv>
          </div>
        </section>
      </main>
    </div>
  )
}