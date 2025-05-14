import { Car, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-primary text-primary-foreground">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Car className="h-6 w-6" />
            <span className="text-xl font-bold">Car Guru</span>
          </div>
          <p className="text-sm opacity-90">Your trusted advisor for finding the perfect car.</p>
          <div className="flex gap-4 mt-3">
  <Link href="https://github.com/subho404" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
    <svg className="w-6 h-6 text-primary-foreground hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.867 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.579.688.481C19.135 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
    </svg>
  </Link>
  <Link href="https://www.linkedin.com/in/subham-biswas-768b47255" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
    <svg className="w-6 h-6 text-primary-foreground hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/>
    </svg>
  </Link>
</div>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <div className="grid grid-cols-1 gap-2">
            <Link href="/" className="text-sm opacity-90 hover:opacity-100">
              Home
            </Link>
            <Link href="/about" className="text-sm opacity-90 hover:opacity-100">
              About Us
            </Link>
            <Link href="/contact" className="text-sm opacity-90 hover:opacity-100">
              Contact
            </Link>
            <Link href="https://www.themotoguru.com/" className="text-sm opacity-90 hover:opacity-100">
              Do you Own a bike also?
              Check Our New MotoGuru AI,Click Me
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm opacity-90">+91 9382999506</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm opacity-90">subhoanjan3@gmil.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm opacity-90">Kolkata, India</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-8 pt-4 border-t border-primary-foreground/20">
        <p className="text-center text-sm opacity-90">
          © {new Date().getFullYear()} Car Guru. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
