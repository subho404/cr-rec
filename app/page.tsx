import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import StickyNote from "@/components/sticky-note"
import { Car, BarChart3, FileText, Settings } from "lucide-react"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gray-900/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-white">CAR</span>
              <span className="text-orange-500">GURU</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
              Your intelligent car advisor for personalized recommendations
            </p>

            <Link href="/recommendations">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:scale-105"
              >
                Let's Choose Your Car <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Sticky Notes Section */}
        <section className="py-16 relative">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Center Card */}
              <div className="lg:col-start-2 lg:row-start-1 flex justify-center">
                <StickyNote
                  icon={<Car className="h-8 w-8 text-orange-500" />}
                  title="AI-Powered Recommendations"
                  description="Our smart system analyzes your driving style and preferences to find your perfect match"
                  delay={0}
                />
              </div>

              {/* Left Cards */}
              <div className="lg:col-start-1 lg:row-start-1 flex justify-center lg:justify-end">
                <StickyNote
                  icon={<BarChart3 className="h-8 w-8 text-orange-500" />}
                  title="Expert Analysis"
                  description="Get insider knowledge with detailed pros and cons for every car suggestion"
                  delay={0.2}
                />
              </div>

              <div className="lg:col-start-1 lg:row-start-2 flex justify-center lg:justify-end">
                <StickyNote
                  icon={<FileText className="h-8 w-8 text-orange-500" />}
                  title="Easy Comparison"
                  description="Compare specs and features side-by-side to confidently choose your next car"
                  delay={0.4}
                />
              </div>

              {/* Right Cards */}
              <div className="lg:col-start-3 lg:row-start-1 flex justify-center lg:justify-start">
                <StickyNote
                  icon={<Settings className="h-8 w-8 text-orange-500" />}
                  title="Personalized Experience"
                  description="Get recommendations tailored specifically to your budget and driving experience level"
                  delay={0.6}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white/10 backdrop-blur-sm">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              Why Choose <span className="text-orange-500">CarGuru</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-white">
                <h3 className="text-xl font-semibold mb-4 text-orange-400">Accurate Recommendations</h3>
                <p className="text-white/80">
                  Our AI engine analyzes thousands of data points to match you with the perfect car for your needs and
                  budget.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-white">
                <h3 className="text-xl font-semibold mb-4 text-orange-400">Comprehensive Database</h3>
                <p className="text-white/80">
                  We cover all car makes and models available in India, from budget-friendly options to luxury vehicles.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-white">
                <h3 className="text-xl font-semibold mb-4 text-orange-400">Unbiased Advice</h3>
                <p className="text-white/80">
                  Get honest pros and cons for each recommendation, helping you make an informed decision.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
