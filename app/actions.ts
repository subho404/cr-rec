"use server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || ""
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || ""
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || ""
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || ""

type FormData = {
  drivingExperience: number
  previousCar?: string
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

type ContactFormData = {
  name: string
  phone: string
  address?: string
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

    // Construct the prompt for Gemini
    const prompt = `You are an expert car advisor in India. I need recommendations for cars available in the Indian market based on the following information:

${data.previousCar ? `- Current/Previous Car: ${data.previousCar}` : ""}
- Budget Range: ${minBudgetFormatted} to ${maxBudgetFormatted}
- Maximum People Travelling: ${data.maxPeople}
- Approximate Daily Driving: ${data.dailyDriving}
- Road Conditions: ${data.roadConditions}
- Top 3 Priorities: 
  1. ${data.priority1}
  2. ${data.priority2}
  3. ${data.priority3}
- Shortlisted Cars: ${shortlistedCars}
- Additional Preferences: ${data.preferences}

Please recommend 3 cars that would be suitable for me. For each car, provide:
1. The car name (make and model)
2. A brief description
3. The price range in Indian Rupees (INR)
4. 4-5 pros
5. 2-3 cons
6. A paragraph explaining why you recommend this car based on my requirements

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
}

Only include cars that are currently available in India and match my budget range. Focus on providing accurate information about the Indian car market.`

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
    // Use Google's Programmable Search Engine API to search for car images
    // For this demo, we'll return a mock response
    // In a production app, you would integrate with Google's Custom Search API

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

export async function sendContactEmail(data: ContactFormData) {
  try {
    // For now, we'll simulate a successful email send
    // In a production environment, you would use EmailJS or another email service

    console.log("Contact form submission:", data)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real implementation, you would send an email here
    // For example, using EmailJS or another email service

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send email. Please try again later.")
  }
}
