"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import RecommendationForm from "@/components/recommendation-form"

export default function RecommendationsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image src="/placeholder-logo.jpg?height=1080&width=1920" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gray-900/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>

          <div className="text-white text-xl font-bold">
            Car<span className="text-orange-500">Guru</span>
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Find Your <span className="text-orange-500">Perfect Car</span>
          </h1>
          <div className="h-1 w-16 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-white/80 max-w-2xl mx-auto">
            Tell us about your requirements and preferences, and our AI will recommend the best cars for you.
          </p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <RecommendationForm />
        </motion.div>
      </div>
    </div>
  )
}
