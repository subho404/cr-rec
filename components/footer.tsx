import { Car, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-gray-900 text-white relative z-10">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Car className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">
              Car<span className="text-orange-500">Guru</span> India
            </span>
          </div>
          <p className="text-sm text-white/80">Your trusted advisor for finding the perfect car in India.</p>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <div className="grid grid-cols-1 gap-2">
            <Link href="/" className="text-sm text-white/80 hover:text-orange-400 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm text-white/80 hover:text-orange-400 transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm text-white/80 hover:text-orange-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-white/80">+91938299950..</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-white/80">subhoanjan3@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-white/80">Kolkata, India</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-8 pt-4 border-t border-gray-800">
        <p className="text-center text-sm text-white/60">
          © {new Date().getFullYear()} Car Guru India. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
