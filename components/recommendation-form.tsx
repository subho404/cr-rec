"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCarRecommendations } from "@/app/actions"
import CarRecommendations from "./car-recommendations"

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
        <div className="bg-card p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-6">
            <Car className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold">Tell Us About Your Requirements</h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <Label htmlFor="previousCar">Current/Previous Car (Optional)</Label>
              <Input id="previousCar" placeholder="e.g., Maruti Suzuki Swift" {...register("previousCar")} />
              <p className="text-sm text-muted-foreground">What car are you currently driving or have driven before?</p>
            </div>

            <div className="space-y-8">
              <h4 className="text-lg font-medium text-primary">Car Guru Questions</h4>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="budgetRange">What is your budget?</Label>
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
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatBudget(budgetRange[0])}</span>
                    <span>{formatBudget(budgetRange[1])}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Select your budget range in lakhs (₹)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carType">Car Type</Label>
                  <Controller
                    name="carType"
                    control={control}
                    rules={{ required: "Car type is required" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="carType" className="w-full">
                          <SelectValue placeholder="Select car type" />
                        </SelectTrigger>
                        <SelectContent>
                          {CAR_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.carType && <p className="text-sm text-red-500">{formErrors.carType}</p>}
                  <p className="text-sm text-muted-foreground">What type of car are you looking for?</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPeople">Maximum People Travelling</Label>
                  <Controller
                    name="maxPeople"
                    control={control}
                    rules={{ required: "Maximum people is required" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="maxPeople" className="w-full">
                          <SelectValue placeholder="Select number of passengers" />
                        </SelectTrigger>
                        <SelectContent>
                          {[2, 3, 4, 5, 6, 7].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} people
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.maxPeople && <p className="text-sm text-red-500">{formErrors.maxPeople}</p>}
                  <p className="text-sm text-muted-foreground">How many people will typically travel in the car?</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dailyDriving">Approximate Daily Driving</Label>
                  <Controller
                    name="dailyDriving"
                    control={control}
                    rules={{ required: "Daily driving is required" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="dailyDriving" className="w-full">
                          <SelectValue placeholder="Select daily driving distance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Less than 10 Kms">Less than 10 Kms</SelectItem>
                          <SelectItem value="10-30 Kms">10-30 Kms</SelectItem>
                          <SelectItem value="30-50 Kms">30-50 Kms</SelectItem>
                          <SelectItem value="50+ Kms">50+ Kms</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.dailyDriving && <p className="text-sm text-red-500">{formErrors.dailyDriving}</p>}
                  <p className="text-sm text-muted-foreground">How far do you drive on a typical day?</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roadConditions">Road Conditions</Label>
                  <Controller
                    name="roadConditions"
                    control={control}
                    rules={{ required: "Road conditions is required" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="roadConditions" className="w-full">
                          <SelectValue placeholder="Select typical road conditions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="City">City</SelectItem>
                          <SelectItem value="Highway">Highway</SelectItem>
                          <SelectItem value="Bad - Broken Roads">Bad - Broken Roads</SelectItem>
                          <SelectItem value="Mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.roadConditions && <p className="text-sm text-red-500">{formErrors.roadConditions}</p>}
                  <p className="text-sm text-muted-foreground">What type of roads will you primarily drive on?</p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-md font-medium text-primary">Your Top 3 Priorities</h4>

                <div className="space-y-2">
                  <Label htmlFor="priority1">Priority 1</Label>
                  <Controller
                    name="priority1"
                    control={control}
                    rules={{ required: "Priority 1 is required" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={handlePriority1Change}>
                        <SelectTrigger id="priority1" className="w-full">
                          <SelectValue placeholder="Select your first priority" />
                        </SelectTrigger>
                        <SelectContent>
                          {priority1Options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.priority1 && <p className="text-sm text-red-500">{formErrors.priority1}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority2">Priority 2</Label>
                  <Controller
                    name="priority2"
                    control={control}
                    rules={{ required: "Priority 2 is required" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={handlePriority2Change} disabled={!priority1}>
                        <SelectTrigger id="priority2" className="w-full">
                          <SelectValue placeholder="Select your second priority" />
                        </SelectTrigger>
                        <SelectContent>
                          {priority2Options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.priority2 && <p className="text-sm text-red-500">{formErrors.priority2}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority3">Priority 3</Label>
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
                        <SelectTrigger id="priority3" className="w-full">
                          <SelectValue placeholder="Select your third priority" />
                        </SelectTrigger>
                        <SelectContent>
                          {priority3Options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formErrors.priority3 && <p className="text-sm text-red-500">{formErrors.priority3}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortlistedCars">Shortlisted Cars</Label>
                <Input
                  id="shortlistedCars"
                  placeholder="e.g., Hyundai Creta, Kia Seltos, Maruti Brezza (or 'Don't Know')"
                  {...register("shortlistedCars")}
                />
                <p className="text-sm text-muted-foreground">
                  List your top 3 shortlisted cars, separated by commas. Type "Don't Know" if you haven't shortlisted
                  any.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferences">Additional Preferences</Label>
              <Textarea
                id="preferences"
                placeholder="Tell us about any other preferences (e.g., fuel type, specific features, brand preferences, etc.)"
                className="min-h-[120px]"
                {...register("preferences", {
                  minLength: {
                    value: 10,
                    message: "Please provide at least 10 characters about your preferences",
                  },
                })}
              />
              <p className="text-sm text-muted-foreground">
                Any other details that might help us recommend the perfect car for you?
              </p>
              {errors.preferences && <p className="text-sm text-red-500">{errors.preferences.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "Getting Recommendations..." : "Get Car Recommendations"}
            </Button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <CarRecommendations recommendations={recommendations} />
          <Button onClick={() => setRecommendations(null)} variant="outline" className="w-full">
            Start Over
          </Button>
        </div>
      )}
    </div>
  )
}
