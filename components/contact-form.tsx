"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { User, Phone, MapPin, Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import emailjs from '@emailjs/browser';

type FormValues = {
  name: string
  phone: string
  address: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
  try {
    setIsSubmitting(true)
    setErrorMessage(null)

    // Replace these with your actual EmailJS values
    const serviceId = 'service_kvsw6fx'
    const templateId = 'template_x1eqqob'
    const publicKey = 'iXFNlxrwNb5ZOBxKm'

    const templateParams = {
      name: data.name,
      phone: data.phone,
      address: data.address,
    }

    await emailjs.send(serviceId, templateId, templateParams, publicKey)

    setIsSuccess(true)
    reset()
  } catch (error) {
    console.error("Error submitting form:", error)
    setErrorMessage(
      error instanceof Error ? error.message : "There was an error submitting your form. Please try again.",
    )
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Your message has been received. We'll get back to you as soon as possible.
          </p>
          <Button onClick={() => setIsSuccess(false)}>Send Another Message</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errorMessage && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-100">
              {errorMessage}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Name*</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                className="pl-10"
                placeholder="Your full name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
            </div>
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number*</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                className="pl-10"
                placeholder="Your phone number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^(?:\+91|0)?[6-9]\d{9}$/,
                    message: "Please enter a valid Indian phone number",
                  },
                })}
              />
            </div>
            <p className="text-xs text-gray-500">
              Enter a valid Indian phone number (e.g., +91 9876543210 or 9876543210)
            </p>
            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                id="address"
                className="pl-10 min-h-[100px]"
                placeholder="Your address (optional)"
                {...register("address")}
              />
            </div>
            <p className="text-xs text-gray-500">This field is optional</p>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center">
                <Send className="mr-2 h-4 w-4" /> Submit
              </span>
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
