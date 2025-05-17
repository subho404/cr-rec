"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Car className="h-6 w-6" />
          <span className="text-xl font-bold">Car Guru India</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <Button
                variant={pathname === link.href ? "default" : "ghost"}
                className={cn(pathname === link.href ? "bg-primary text-primary-foreground" : "")}
              >
                {link.label}
              </Button>
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-b"
          >
            <div className="container py-4 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} passHref>
                  <Button
                    variant={pathname === link.href ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      pathname === link.href ? "bg-primary text-primary-foreground" : "",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
