import Link from "next/link"
import { Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Car className="h-6 w-6" />
          <span className="text-xl font-bold">Car Guru</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" passHref>
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/about" passHref>
            <Button variant="ghost">About Us</Button>
          </Link>
          <Link href="/contact" passHref>
            <Button variant="ghost">Contact</Button>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
