"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { User, Phone, Mail, Send, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import emailjs from "@emailjs/browser"

type FormValues = {
  name: string
  phone: string
  email: string
  message: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [emailJSInitialized, setEmailJSInitialized] = useState(false)

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'iXFNlxrwNb5ZOBxKm'
    if (publicKey) {
      emailjs.init(publicKey)
      setEmailJSInitialized(true)
      console.log("EmailJS initialized with public key")
    } else {
      console.error("EmailJS public key is missing")
      setErrorMessage("Email service configuration is missing. Please contact the administrator.")
    }
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true)
      setErrorMessage(null)

      // Check if EmailJS is initialized
      if (!emailJSInitialized) {
        throw new Error("Email service is not initialized. Please try again later.")
      }

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID||'service_kvsw6fx'
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_x1eqqob'

      if (!serviceId || !templateId) {
        throw new Error("Email service configuration is incomplete. Please contact the administrator.")
      }

      // Log the configuration for debugging
      console.log("EmailJS Configuration:", {
        serviceId,
        templateId,
        initialized: emailJSInitialized,
      })

      // Send email using EmailJS browser client
      const templateParams = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.message || "No message provided",
      }

      const response = await emailjs.send(serviceId, templateId, templateParams)

      if (response.status !== 200) {
        throw new Error(`Email sending failed with status: ${response.status}`)
      }

      // Success!
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
    <div className="p-6 md:p-8">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="h-16 w-16 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-orange-500" />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">Thank You!</h3>
          <p className="text-center text-white/80 mb-6">
            Your message has been received. We'll get back to you as soon as possible.
          </p>
          <Button onClick={() => setIsSuccess(false)} className="bg-orange-500 hover:bg-orange-600 text-white">
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errorMessage && (
            <div className="p-4 mb-4 text-sm text-red-400 bg-red-900/50 rounded-lg border border-red-700">
              {errorMessage}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Name <span className="text-orange-500">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                <Input
                  id="name"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
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
              {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">
                Phone <span className="text-orange-500">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                <Input
                  id="phone"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
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
              {errors.phone && <p className="text-sm text-red-400">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email <span className="text-orange-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
                  placeholder="Your email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </div>
              {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">
                Message <span className="text-orange-500">*</span>
              </Label>
              <Textarea
                id="message"
                className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
                placeholder="Your message"
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
              />
              {errors.message && <p className="text-sm text-red-400">{errors.message.message}</p>}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isSubmitting || !emailJSInitialized}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </span>
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
