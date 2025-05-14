import Link from "next/link"
import Hero from "@/components/hero"
import RecommendationForm from "@/components/recommendation-form"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <section className="container py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">Get Your Personalized Car Recommendation</h2>
          <RecommendationForm />
        </div>
      </section>

      <section id="about" className="py-12 bg-primary/5">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Why Choose Car Guru India</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-primary">Our Mission</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We aim to simplify the car buying process for Indians by providing personalized recommendations based
                  on your unique preferences, budget, and driving experience.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-primary">Why Choose Us</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our AI-powered recommendation engine analyzes thousands of car models available in India to find the
                  perfect match for your needs and budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-12">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Contact Us</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
                Have questions about our car recommendations? Reach out to our team!
              </p>
              <div className="flex justify-center">
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
