import { Car, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative z-20 w-full py-12 bg-blue-600 text-gray-800 shadow-lg">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Car className="h-6 w-6" />
            <span className="text-xl font-bold ">Car Guru India</span>
          </div>
          <p className="text-sm opacity-90">Your trusted advisor for finding the perfect car in India.</p>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <div className="grid grid-cols-1 gap-2">
            <Link href="/" className="text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm opacity-90">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm opacity-90">info@carguruindia.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm opacity-90">Mumbai, India</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-8 pt-4 border-t border-gray-200">
        <p className="text-center text-sm opacity-90">
          © {new Date().getFullYear()} Car Guru India. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
