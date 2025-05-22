"use server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

// Car image mapping for common Indian cars
const CAR_IMAGE_MAPPING: Record<string, string[]> = {
  "Tata Nexon": [
    "/placeholder.svg?height=400&width=600&text=Tata%20Nexon%20Front",
    "/placeholder.svg?height=400&width=600&text=Tata%20Nexon%20Side",
    "/placeholder.svg?height=400&width=600&text=Tata%20Nexon%20Rear",
  ],
  "Maruti Suzuki Swift": [
    "/placeholder.svg?height=400&width=600&text=Maruti%20Swift%20Front",
    "/placeholder.svg?height=400&width=600&text=Maruti%20Swift%20Side",
    "/placeholder.svg?height=400&width=600&text=Maruti%20Swift%20Rear",
  ],
  "Hyundai Creta": [
    "/placeholder.svg?height=400&width=600&text=Hyundai%20Creta%20Front",
    "/placeholder.svg?height=400&width=600&text=Hyundai%20Creta%20Side",
    "/placeholder.svg?height=400&width=600&text=Hyundai%20Creta%20Rear",
  ],
  "Kia Seltos": [
    "/placeholder.svg?height=400&width=600&text=Kia%20Seltos%20Front",
    "/placeholder.svg?height=400&width=600&text=Kia%20Seltos%20Side",
    "/placeholder.svg?height=400&width=600&text=Kia%20Seltos%20Rear",
  ],
  "Mahindra XUV700": [
    "/placeholder.svg?height=400&width=600&text=Mahindra%20XUV700%20Front",
    "/placeholder.svg?height=400&width=600&text=Mahindra%20XUV700%20Side",
    "/placeholder.svg?height=400&width=600&text=Mahindra%20XUV700%20Rear",
  ],
  "Toyota Fortuner": [
    "/placeholder.svg?height=400&width=600&text=Toyota%20Fortuner%20Front",
    "/placeholder.svg?height=400&width=600&text=Toyota%20Fortuner%20Side",
    "/placeholder.svg?height=400&width=600&text=Toyota%20Fortuner%20Rear",
  ],
  "Volkswagen Virtus": [
    "/placeholder.svg?height=400&width=600&text=Volkswagen%20Virtus%20Front",
    "/placeholder.svg?height=400&width=600&text=Volkswagen%20Virtus%20Side",
    "/placeholder.svg?height=400&width=600&text=Volkswagen%20Virtus%20Rear",
  ],
  "Skoda Slavia": [
    "/placeholder.svg?height=400&width=600&text=Skoda%20Slavia%20Front",
    "/placeholder.svg?height=400&width=600&text=Skoda%20Slavia%20Side",
    "/placeholder.svg?height=400&width=600&text=Skoda%20Slavia%20Rear",
  ],
  "Honda City": [
    "/placeholder.svg?height=400&width=600&text=Honda%20City%20Front",
    "/placeholder.svg?height=400&width=600&text=Honda%20City%20Side",
    "/placeholder.svg?height=400&width=600&text=Honda%20City%20Rear",
  ],
}

type FormData = {
  drivingExperience: number
  previousCar?: string
  minBudget: number
  maxBudget: number
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

export async function getCarRecommendations(data: FormData) {
  try {
    // Format the budget in Indian format
    const formatBudget = (value: number) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(value)
    }

    const minBudgetFormatted = formatBudget(data.minBudget)
    const maxBudgetFormatted = formatBudget(data.maxBudget)

    // Process shortlisted cars
    const shortlistedCars =
      data.shortlistedCars.trim() === "Don't Know" || data.shortlistedCars.trim() === ""
        ? "No cars shortlisted"
        : data.shortlistedCars

    // Enhanced prompt for better recommendations
    const prompt = `You are an expert car advisor in India with deep knowledge of all car brands and models available in the Indian market. I need recommendations for cars based on the following information:

${data.previousCar ? `- Current/Previous Car: ${data.previousCar}` : ""}
- Budget Range: ${minBudgetFormatted} to ${maxBudgetFormatted}
- Car Type: ${data.carType}
- Maximum People Travelling: ${data.maxPeople}
- Approximate Daily Driving: ${data.dailyDriving}
- Road Conditions: ${data.roadConditions}
- Top 3 Priorities: 
  1. ${data.priority1}
  2. ${data.priority2}
  3. ${data.priority3}
- Shortlisted Cars: ${shortlistedCars}
- Additional Preferences: ${data.preferences}

Please recommend EXACTLY 3 cars that would be suitable for me. For each car, provide:
1. The car name (make and model)
2. A brief description
3. The price range in Indian Rupees (INR)
4. 4-5 pros
5. 2-3 cons
6. A paragraph explaining why you recommend this car based on my requirements

IMPORTANT GUIDELINES:
1. Consider ALL car brands available in India, including international brands like Toyota, Honda, Hyundai, Volkswagen, Skoda, Kia, MG, etc., not just Indian manufacturers.
2. Be accurate with your recommendations - if I mention "sporty engine" or "performance", recommend cars known for these attributes (like Skoda, Volkswagen, or appropriate models from other brands).
3. Ensure the recommendations match the car type I specified.
4. Only recommend cars that are currently available in the Indian market and match my budget range.
5. Provide diverse recommendations from different manufacturers.
6. Be specific about models, variants, and features.
7. If I mention specific preferences like "fuel efficiency" or "safety features", prioritize cars that excel in those areas.
8. Consider the road conditions I mentioned when recommending suspension and ground clearance.
9. If I'm a new driver, prioritize cars that are easier to handle.
10. For performance-oriented requests, consider turbocharged engines and cars with good power-to-weight ratios.

If I've shortlisted cars (not "No cars shortlisted"), also provide a comparison section explaining:
1. The strengths of each shortlisted car
2. The weaknesses of each shortlisted car
3. Why your recommended cars are better choices

Format your response as a JSON object with the following structure:
{
  "cars": [
    {
      "name": "Car Make and Model",
      "description": "Brief description",
      "priceRange": "Price range in INR",
      "pros": ["Pro 1", "Pro 2", "Pro 3", "Pro 4", "Pro 5"],
      "cons": ["Con 1", "Con 2", "Con 3"],
      "whyRecommended": "Explanation of why this car is recommended"
    }
  ],
  "shortlistedComparison": [
    {
      "car": "Shortlisted Car Name",
      "strengths": ["Strength 1", "Strength 2"],
      "weaknesses": ["Weakness 1", "Weakness 2"],
      "whyBetter": "Why recommended cars are better than this shortlisted car"
    }
  ]
}`

    // Use the Gemini model to generate recommendations
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    // Parse the JSON response
    // Find the JSON object in the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to parse JSON response")
    }

    const jsonStr = jsonMatch[0]
    const recommendations = JSON.parse(jsonStr)

    return recommendations
  } catch (error) {
    console.error("Error generating car recommendations:", error)
    throw new Error("Failed to generate car recommendations")
  }
}

export async function searchCarImages(carName: string) {
  try {
    // Check if we have predefined images for this car
    const normalizedCarName = Object.keys(CAR_IMAGE_MAPPING).find((key) =>
      carName.toLowerCase().includes(key.toLowerCase()),
    )

    if (normalizedCarName && CAR_IMAGE_MAPPING[normalizedCarName]) {
      // Return predefined images
      return {
        searchQuery: `${normalizedCarName} car india exterior`,
        imageUrls: CAR_IMAGE_MAPPING[normalizedCarName],
      }
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate search query for Google Images
    const searchQuery = `${carName} car india exterior`

    // In a real implementation, you would call the Google Custom Search API here
    // For now, we'll return mock image URLs
    return {
      searchQuery,
      imageUrls: [
        `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(carName)} Front`,
        `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(carName)} Side`,
        `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(carName)} Rear`,
      ],
    }
  } catch (error) {
    console.error("Error searching for car images:", error)
    throw new Error("Failed to search for car images")
  }
}
