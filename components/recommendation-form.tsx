"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Car, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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

type FormValues = {
  previousCar: string
  minBudget: number
  maxBudget: number
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
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      previousCar: "",
      minBudget: 500000,
      maxBudget: 1500000,
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

  const minBudget = watch("minBudget")
  const maxBudget = watch("maxBudget")
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

      // Validate that max budget is greater than min budget
      if (data.maxBudget <= data.minBudget) {
        setFormErrors({
          ...formErrors,
          maxBudget: "Maximum budget must be greater than minimum budget",
        })
        setIsLoading(false)
        return
      }

      // Validate required fields
      const requiredFields = ["maxPeople", "dailyDriving", "roadConditions", "priority1", "priority2", "priority3"]
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

      // Add a default driving experience of 0 for the API
      const formData = {
        ...data,
        drivingExperience: 0,
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
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
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

              <div>
                <div className="text-sm font-medium mb-2">Budget Range (₹)</div>
                <div className="flex items-center gap-2 mb-2">
                  <IndianRupee className="h-4 w-4" />
                  <span>
                    {formatBudget(minBudget)} - {formatBudget(maxBudget)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="minBudget">Minimum Budget</Label>
                    <Input
                      id="minBudget"
                      type="number"
                      min={100000}
                      step={50000}
                      {...register("minBudget", {
                        valueAsNumber: true,
                        min: {
                          value: 100000,
                          message: "Minimum budget should be at least ₹1,00,000",
                        },
                      })}
                    />
                    {errors.minBudget && <p className="text-sm text-red-500">{errors.minBudget.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxBudget">Maximum Budget</Label>
                    <Input
                      id="maxBudget"
                      type="number"
                      min={100000}
                      step={50000}
                      {...register("maxBudget", {
                        valueAsNumber: true,
                        min: {
                          value: 100000,
                          message: "Maximum budget should be at least ₹1,00,000",
                        },
                      })}
                    />
                    {errors.maxBudget && <p className="text-sm text-red-500">{errors.maxBudget.message}</p>}
                    {formErrors.maxBudget && <p className="text-sm text-red-500">{formErrors.maxBudget}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPeople">Maximum People Travelling</Label>
                <select
                  id="maxPeople"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("maxPeople", { required: true })}
                >
                  <option value="">Select number of passengers</option>
                  {[2, 3, 4, 5, 6, 7].map((num) => (
                    <option key={num} value={num.toString()}>
                      {num} people
                    </option>
                  ))}
                </select>
                <p className="text-sm text-muted-foreground">How many people will typically travel in the car?</p>
                {formErrors.maxPeople && <p className="text-sm text-red-500">{formErrors.maxPeople}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dailyDriving">Approximate Daily Driving</Label>
                <select
                  id="dailyDriving"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("dailyDriving", { required: true })}
                >
                  <option value="">Select daily driving distance</option>
                  <option value="Less than 10 Kms">Less than 10 Kms</option>
                  <option value="10-30 Kms">10-30 Kms</option>
                  <option value="30-50 Kms">30-50 Kms</option>
                  <option value="50+ Kms">50+ Kms</option>
                </select>
                <p className="text-sm text-muted-foreground">How far do you drive on a typical day?</p>
                {formErrors.dailyDriving && <p className="text-sm text-red-500">{formErrors.dailyDriving}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="roadConditions">Road Conditions</Label>
                <select
                  id="roadConditions"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("roadConditions", { required: true })}
                >
                  <option value="">Select typical road conditions</option>
                  <option value="City">City</option>
                  <option value="Highway">Highway</option>
                  <option value="Bad - Broken Roads">Bad - Broken Roads</option>
                </select>
                <p className="text-sm text-muted-foreground">What type of roads will you primarily drive on?</p>
                {formErrors.roadConditions && <p className="text-sm text-red-500">{formErrors.roadConditions}</p>}
              </div>

              <div className="space-y-6">
                <h4 className="text-md font-medium text-primary">Your Top 3 Priorities</h4>

                <div className="space-y-2">
                  <Label htmlFor="priority1">Priority 1</Label>
                  <select
                    id="priority1"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={priority1}
                    onChange={(e) => handlePriority1Change(e.target.value)}
                  >
                    <option value="">Select your first priority</option>
                    {priority1Options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {formErrors.priority1 && <p className="text-sm text-red-500">{formErrors.priority1}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority2">Priority 2</Label>
                  <select
                    id="priority2"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={priority2}
                    onChange={(e) => handlePriority2Change(e.target.value)}
                    disabled={!priority1}
                  >
                    <option value="">Select your second priority</option>
                    {priority2Options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {formErrors.priority2 && <p className="text-sm text-red-500">{formErrors.priority2}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority3">Priority 3</Label>
                  <select
                    id="priority3"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={watch("priority3")}
                    onChange={(e) => handlePriority3Change(e.target.value)}
                    disabled={!priority1 || !priority2}
                  >
                    <option value="">Select your third priority</option>
                    {priority3Options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
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
