"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Check, X, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Search, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"
import { searchCarImages } from "@/app/actions"

export default function CarRecommendations({ recommendations }: { recommendations: any }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [carImages, setCarImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentCar, setCurrentCar] = useState<any>(null)

  useEffect(() => {
    if (recommendations && recommendations.cars && recommendations.cars.length > 0) {
      setCurrentCar(recommendations.cars[currentIndex])
    } else {
      setCurrentCar(null)
    }
  }, [recommendations, currentIndex])

  useEffect(() => {
    const fetchCarImages = async () => {
      if (currentCar?.name) {
        try {
          setIsLoadingImages(true)
          const result = await searchCarImages(currentCar.name)
          setCarImages(result.imageUrls)
          setSearchQuery(result.searchQuery)
          setCurrentImageIndex(0)
        } catch (error) {
          console.error("Error fetching car images:", error)
          setCarImages([])
        } finally {
          setIsLoadingImages(false)
        }
      } else {
        setCarImages([])
        setIsLoadingImages(false)
      }
    }

    fetchCarImages()
  }, [currentCar])

  if (!recommendations || !recommendations.cars || recommendations.cars.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-red-500">No Recommendations Found</CardTitle>
          <CardDescription className="text-center">
            We couldn't generate recommendations based on your criteria. Please try again with different preferences.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const cars = recommendations.cars
  const shortlistedComparison = recommendations.shortlistedComparison || []

  const nextCar = () => {
    setCurrentIndex((prev) => (prev + 1) % cars.length)
  }

  const prevCar = () => {
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length)
  }

  const nextImage = () => {
    if (carImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % carImages.length)
    }
  }

  const prevImage = () => {
    if (carImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + carImages.length) % carImages.length)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-primary/10 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-center mb-4 text-primary">Your Personalized Car Recommendations</h3>
        <p className="text-center text-muted-foreground mb-2">
          Based on your preferences, we recommend the following cars:
        </p>
        <div className="flex justify-center gap-2 mb-4">
          {cars.map((car: any, index: number) => (
            <Badge
              key={index}
              variant={index === currentIndex ? "default" : "outline"}
              className={index === currentIndex ? "bg-primary hover:bg-primary/90" : "cursor-pointer"}
              onClick={() => setCurrentIndex(index)}
            >
              {index + 1}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="recommendation" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendation">
          <Card className="overflow-hidden">
            <div className="relative h-[250px] md:h-[300px]">
              <AnimatePresence mode="wait">
                {isLoadingImages ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center bg-muted"
                  >
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px] mx-auto" />
                      <Skeleton className="h-4 w-[160px] mx-auto" />
                    </div>
                  </motion.div>
                ) : carImages.length > 0 ? (
                  <motion.div
                    key={`image-${currentImageIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={carImages[currentImageIndex] || "/placeholder.svg"}
                      alt={`${currentCar?.name} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {currentImageIndex + 1} / {carImages.length}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center bg-muted"
                  >
                    <p>No images available</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-background/80 hover:bg-background z-10"
                  onClick={carImages.length > 0 ? prevImage : prevCar}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-background/80 hover:bg-background z-10"
                  onClick={carImages.length > 0 ? nextImage : nextCar}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">{currentCar?.name}</CardTitle>
                  <CardDescription>{currentCar?.description || "Perfect match for your requirements"}</CardDescription>
                </div>
                <Badge className="bg-primary hover:bg-primary/90">
                  {currentIndex + 1}/{cars.length}
                </Badge>
              </div>
              <div className="mt-2">
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  <Search className="h-3 w-3 mr-1" />
                  View more images on Google
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-green-600 flex items-center">
                    <Check className="mr-2 h-5 w-5" /> Pros
                  </h4>
                  <ul className="space-y-2">
                    {currentCar?.pros.map((pro: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <Check className="mr-2 h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>{pro}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-red-600 flex items-center">
                    <X className="mr-2 h-5 w-5" /> Cons
                  </h4>
                  <ul className="space-y-2">
                    {currentCar?.cons.map((con: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <X className="mr-2 h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>{con}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-4 bg-primary/10 rounded-md"
              >
                <h4 className="font-semibold mb-2">Why We Recommend This Car:</h4>
                <p>{currentCar?.whyRecommended || "This car perfectly matches your requirements and preferences."}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full p-4 bg-muted rounded-md"
              >
                <h4 className="font-semibold mb-2">Price Range:</h4>
                <p>{currentCar?.priceRange || "Within your specified budget"}</p>
              </motion.div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevCar} className="flex items-center">
                <ChevronLeft className="mr-1 h-4 w-4" /> Previous Car
              </Button>
              <Button variant="outline" onClick={nextCar} className="flex items-center">
                Next Car <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Comparison with Shortlisted Cars</CardTitle>
              <CardDescription>See how our recommendations compare to your shortlisted cars</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {shortlistedComparison.length > 0 ? (
                shortlistedComparison.map((comparison: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 border rounded-md"
                  >
                    <h4 className="font-semibold text-lg mb-2">{comparison.car}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium flex items-center text-green-600">
                          <ThumbsUp className="mr-2 h-4 w-4" /> Strengths
                        </h5>
                        <ul className="mt-2 space-y-1">
                          {comparison.strengths?.map((strength: string, idx: number) => (
                            <li key={idx} className="flex items-start text-sm">
                              <Check className="mr-2 h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium flex items-center text-red-600">
                          <ThumbsDown className="mr-2 h-4 w-4" /> Weaknesses
                        </h5>
                        <ul className="mt-2 space-y-1">
                          {comparison.weaknesses?.map((weakness: string, idx: number) => (
                            <li key={idx} className="flex items-start text-sm">
                              <X className="mr-2 h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                              <span>{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <h5 className="font-medium">Why Our Recommendation Is Better:</h5>
                      <p className="mt-1 text-sm">
                        {comparison.whyBetter ||
                          "Our recommendation better matches your specific needs and preferences."}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center p-4">
                  <p>No shortlisted cars were provided for comparison.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
