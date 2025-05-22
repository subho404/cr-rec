"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Car, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCarRecommendations } from "@/app/actions"
import CarRecommendations from "./car-recommendations"
import { motion } from "framer-motion"

const PRIORITY_OPTIONS = [
  "Boot Space",
  "Technology",
  "Mileage",
  "Maintenance",
  "Design",
  "Features",
  "Ground Clearance",
  "Performance",
  "Resale",
  "Safety",
  "Space",
]

const CAR_TYPES = [
  "Hatchback",
  "Sedan",
  "SUV",
  "MUV/MPV",
  "Crossover",
  "Luxury Sedan",
  "Luxury SUV",
  "Sports Car",
  "Electric Vehicle",
  "Compact SUV",
]

// Budget range in lakhs (₹)
const MIN_BUDGET = 3 // 3 lakhs
const MAX_BUDGET = 50 // 50 lakhs
const STEP_BUDGET = 1 // 1 lakh steps

type FormValues = {
  previousCar: string
  budgetRange: number[]
  carType: string
  maxPeople: string
  dailyDriving: string
  roadConditions: string
  priority1: string
  priority2: string
  priority3: string
  shortlistedCars: string
  preferences: string
}

export default function RecommendationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<any>(null)
  const [priority1Options, setPriority1Options] = useState(PRIORITY_OPTIONS)
  const [priority2Options, setPriority2Options] = useState(PRIORITY_OPTIONS)
  const [priority3Options, setPriority3Options] = useState(PRIORITY_OPTIONS)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      previousCar: "",
      budgetRange: [5, 15], // Default: 5-15 lakhs
      carType: "",
      maxPeople: "",
      dailyDriving: "",
      roadConditions: "",
      priority1: "",
      priority2: "",
      priority3: "",
      shortlistedCars: "",
      preferences: "",
    },
  })

  const budgetRange = watch("budgetRange")
  const priority1 = watch("priority1")
  const priority2 = watch("priority2")

  // Update priority options based on selections
  const handlePriority1Change = (value: string) => {
    setValue("priority1", value)
    setPriority2Options(PRIORITY_OPTIONS.filter((option) => option !== value))
    setPriority3Options(PRIORITY_OPTIONS.filter((option) => option !== value && option !== priority2))
  }

  const handlePriority2Change = (value: string) => {
    setValue("priority2", value)
    setPriority3Options(PRIORITY_OPTIONS.filter((option) => option !== priority1 && option !== value))
  }

  const handlePriority3Change = (value: string) => {
    setValue("priority3", value)
  }

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)
      setFormErrors({})

      // Validate required fields
      const requiredFields = [
        "carType",
        "maxPeople",
        "dailyDriving",
        "roadConditions",
        "priority1",
        "priority2",
        "priority3",
      ]
      const newErrors: Record<string, string> = {}

      requiredFields.forEach((field) => {
        if (!data[field as keyof FormValues]) {
          newErrors[field] = `${field.replace(/([A-Z])/g, " $1").toLowerCase()} is required`
        }
      })

      if (Object.keys(newErrors).length > 0) {
        setFormErrors(newErrors)
        setIsLoading(false)
        return
      }

      // Convert budget from lakhs to actual values
      const minBudget = data.budgetRange[0] * 100000
      const maxBudget = data.budgetRange[1] * 100000

      // Add a default driving experience of 0 for the API
      const formData = {
        ...data,
        drivingExperience: 0,
        minBudget,
        maxBudget,
      }

      const result = await getCarRecommendations(formData)
      setRecommendations(result)
    } catch (error) {
      console.error("Error getting recommendations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatBudget = (value: number) => {
    return `₹${value} Lakh${value !== 1 ? "s" : ""}`
  }

  return (
    <div id="recommendation-form">
      {!recommendations ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black/70 backdrop-blur-sm p-6 rounded-lg border border-white/10 shadow-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <Car className="h-6 w-6 text-orange-500" />
            <h3 className="text-2xl font-semibold text-white">Tell Us About Your Requirements</h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <Label htmlFor="previousCar" className="text-white">
                Current/Previous Car (Optional)
              </Label>
              <Input
                id="previousCar"
                placeholder="e.g., Maruti Suzuki Swift"
                {...register("previousCar")}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
              />
              <p className="text-sm text-white/60">What car are you currently driving or have driven before?</p>
            </div>

            <div className="space-y-8">
              <h4 className="text-lg font-medium text-orange-500">Car Guru Questions</h4>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="budgetRange" className="text-white">
                    What is your budget?
                  </Label>
                  <div className="pt-6 pb-2">
                    <Controller
                      name="budgetRange"
                      control={control}
                      render={({ field }) => (
                        <Slider
                          min={MIN_BUDGET}
                          max={MAX_BUDGET}
                          step={STEP_BUDGET}
                          value={field.value}
                          onValueChange={field.onChange}
                          className="w-full"
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>{formatBudget(budgetRange[0])}</span>
                    <span>{formatBudget(budgetRange[1])}</span>
                  </div>
                  <p className="text-sm text-white/60">Select your budget range in lakhs (₹)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carType" className="text-white">
                    Car Type
                  </Label>
                  <Controller
                    name="carType"
                    control={control}
                    rules={{ required: "Car type is required" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          id="carType"
                          className="w-full bg-white/10 border-white/20 text-white focus:border-orange-500"
                        >
                          <SelectValue placeholder="Select car type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                          {CAR_TYPES.map((type) => (
                            <SelectItem key={type} value={type} className="focus:bg-orange-500/20 focus:text-white">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.carType && <p className="text-sm text-red-400">{formErrors.carType}</p>}
                  <p className="text-sm text-white/60">What type of car are you looking for?</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPeople" className="text-white">
                    Maximum People Travelling
                  </Label>
                  <Controller
                    name="maxPeople"
                    control={control}
                    rules={{ required: "Maximum people is required" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          id="maxPeople"
                          className="w-full bg-white/10 border-white/20 text-white focus:border-orange-500"
                        >
                          <SelectValue placeholder="Select number of passengers" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                          {[2, 3, 4, 5, 6, 7].map((num) => (
                            <SelectItem
                              key={num}
                              value={num.toString()}
                              className="focus:bg-orange-500/20 focus:text-white"
                            >
                              {num} people
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.maxPeople && <p className="text-sm text-red-400">{formErrors.maxPeople}</p>}
                  <p className="text-sm text-white/60">How many people will typically travel in the car?</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dailyDriving" className="text-white">
                    Approximate Daily Driving
                  </Label>
                  <Controller
                    name="dailyDriving"
                    control={control}
                    rules={{ required: "Daily driving is required" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          id="dailyDriving"
                          className="w-full bg-white/10 border-white/20 text-white focus:border-orange-500"
                        >
                          <SelectValue placeholder="Select daily driving distance" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                          <SelectItem value="Less than 10 Kms" className="focus:bg-orange-500/20 focus:text-white">
                            Less than 10 Kms
                          </SelectItem>
                          <SelectItem value="10-30 Kms" className="focus:bg-orange-500/20 focus:text-white">
                            10-30 Kms
                          </SelectItem>
                          <SelectItem value="30-50 Kms" className="focus:bg-orange-500/20 focus:text-white">
                            30-50 Kms
                          </SelectItem>
                          <SelectItem value="50+ Kms" className="focus:bg-orange-500/20 focus:text-white">
                            50+ Kms
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.dailyDriving && <p className="text-sm text-red-400">{formErrors.dailyDriving}</p>}
                  <p className="text-sm text-white/60">How far do you drive on a typical day?</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roadConditions" className="text-white">
                    Road Conditions
                  </Label>
                  <Controller
                    name="roadConditions"
                    control={control}
                    rules={{ required: "Road conditions is required" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          id="roadConditions"
                          className="w-full bg-white/10 border-white/20 text-white focus:border-orange-500"
                        >
                          <SelectValue placeholder="Select typical road conditions" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                          <SelectItem value="City" className="focus:bg-orange-500/20 focus:text-white">
                            City
                          </SelectItem>
                          <SelectItem value="Highway" className="focus:bg-orange-500/20 focus:text-white">
                            Highway
                          </SelectItem>
                          <SelectItem value="Bad - Broken Roads" className="focus:bg-orange-500/20 focus:text-white">
                            Bad - Broken Roads
                          </SelectItem>
                          <SelectItem value="Mixed" className="focus:bg-orange-500/20 focus:text-white">
                            Mixed
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.roadConditions && <p className="text-sm text-red-400">{formErrors.roadConditions}</p>}
                  <p className="text-sm text-white/60">What type of roads will you primarily drive on?</p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-md font-medium text-orange-500">Your Top 3 Priorities</h4>

                <div className="space-y-2">
                  <Label htmlFor="priority1" className="text-white">
                    Priority 1
                  </Label>
                  <Controller
                    name="priority1"
                    control={control}
                    rules={{ required: "Priority 1 is required" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={handlePriority1Change}>
                        <SelectTrigger
                          id="priority1"
                          className="w-full bg-white/10 border-white/20 text-white focus:border-orange-500"
                        >
                          <SelectValue placeholder="Select your first priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                          {priority1Options.map((option) => (
                            <SelectItem key={option} value={option} className="focus:bg-orange-500/20 focus:text-white">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.priority1 && <p className="text-sm text-red-400">{formErrors.priority1}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority2" className="text-white">
                    Priority 2
                  </Label>
                  <Controller
                    name="priority2"
                    control={control}
                    rules={{ required: "Priority 2 is required" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={handlePriority2Change} disabled={!priority1}>
                        <SelectTrigger
                          id="priority2"
                          className="w-full bg-white/10 border-white/20 text-white focus:border-orange-500 disabled:opacity-50"
                        >
                          <SelectValue placeholder="Select your second priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                          {priority2Options.map((option) => (
                            <SelectItem key={option} value={option} className="focus:bg-orange-500/20 focus:text-white">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.priority2 && <p className="text-sm text-red-400">{formErrors.priority2}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority3" className="text-white">
                    Priority 3
                  </Label>
                  <Controller
                    name="priority3"
                    control={control}
                    rules={{ required: "Priority 3 is required" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={handlePriority3Change}
                        disabled={!priority1 || !priority2}
                      >
                        <SelectTrigger
                          id="priority3"
                          className="w-full bg-white/10 border-white/20 text-white focus:border-orange-500 disabled:opacity-50"
                        >
                          <SelectValue placeholder="Select your third priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                          {priority3Options.map((option) => (
                            <SelectItem key={option} value={option} className="focus:bg-orange-500/20 focus:text-white">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.priority3 && <p className="text-sm text-red-400">{formErrors.priority3}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortlistedCars" className="text-white">
                  Shortlisted Cars
                </Label>
                <Input
                  id="shortlistedCars"
                  placeholder="e.g., Hyundai Creta, Kia Seltos, Maruti Brezza (or 'Don't Know')"
                  {...register("shortlistedCars")}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
                />
                <p className="text-sm text-white/60">
                  List your top 3 shortlisted cars, separated by commas. Type "Don't Know" if you haven't shortlisted
                  any.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferences" className="text-white">
                Additional Preferences
              </Label>
              <Textarea
                id="preferences"
                placeholder="Tell us about any other preferences (e.g., fuel type, specific features, brand preferences, etc.)"
                className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
                {...register("preferences", {
                  minLength: {
                    value: 10,
                    message: "Please provide at least 10 characters about your preferences",
                  },
                })}
              />
              <p className="text-sm text-white/60">
                Any other details that might help us recommend the perfect car for you?
              </p>
              {errors.preferences && <p className="text-sm text-red-400">{errors.preferences.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Getting Recommendations...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Get Car Recommendations <ChevronRight className="ml-2 h-5 w-5" />
                </span>
              )}
            </Button>
          </form>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <CarRecommendations recommendations={recommendations} />
          <Button
            onClick={() => setRecommendations(null)}
            variant="outline"
            className="w-full border-orange-500 text-white hover:bg-orange-500/20"
          >
            Start Over
          </Button>
        </div>
      )}
    </div>
  )
}
