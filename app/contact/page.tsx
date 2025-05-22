import ContactForm from "@/components/contact-form"
import { DebugEnv } from "@/components/debug-env"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gray-900/80" />
      </div>

      <div className="relative z-10 container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Contact <span className="text-orange-500">Us</span>
          </h1>

          <div className="h-1 w-16 bg-orange-500 mx-auto mb-8"></div>

          <p className="text-center mb-8 text-white/90">
            Have questions or need assistance? Fill out the form below and our team will get back to you as soon as
            possible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Phone</h3>
              <p className="text-white/80">+91938299950.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Email</h3>
              <p className="text-white/80">subhoanjan3@gmail.com</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Address</h3>
              <p className="text-white/80">Kolkata, India</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
            <ContactForm />
          </div>

          <DebugEnv />
        </div>
      </div>
    </div>
  )
}
