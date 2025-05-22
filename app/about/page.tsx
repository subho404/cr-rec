import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gray-900/80" />
      </div>

      <div className="relative z-10 container py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            About <span className="text-orange-500">CarGuru</span> India
          </h1>

          <div className="h-1 w-20 bg-orange-500 mx-auto mb-8"></div>

          <div className="mb-12">
            <p className="text-lg text-center mb-6 text-white/90">
              Car Guru India was founded with a simple mission: to help Indian car buyers find their perfect vehicle
              using the power of artificial intelligence and expert knowledge of the Indian automotive market.
            </p>
            <p className="text-lg text-center mb-6 text-white/90">
              Our platform combines cutting-edge AI technology with deep understanding of Indian roads, driving
              conditions, and car preferences to deliver personalized recommendations that truly match your needs.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-center mb-4 text-white">
            Meet Our <span className="text-orange-500">Founders</span>
          </h2>

          <div className="h-1 w-16 bg-orange-500 mx-auto mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden flex flex-col bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="relative w-full pt-[75%]">
                <Image
                  src="subham.png"
                  alt="Subham Biswas"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white">Subham Biswas</h3>
                <p className="text-orange-400 mb-4">Co-Founder & CEO</p>
                <p className="text-white/80 mb-6">
                  Passionate about automobiles and technology, Subham brings his expertise in AI and deep knowledge of
                  the Indian automotive market to help customers find their perfect car.
                </p>
                <Link href="https://www.instagram.com/subham4815/" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-orange-500 text-white hover:bg-orange-500/20"
                  >
                    <Instagram className="h-4 w-4 text-orange-500" />
                    Follow on Instagram
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="overflow-hidden flex flex-col bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="relative w-full pt-[75%]">
                <Image
                  src="bijit.png"
                  alt="Bijit Sarkar"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white">Bijit Sarkar</h3>
                <p className="text-orange-400 mb-4">Co-Founder & CTO</p>
                <p className="text-white/80 mb-6">
                  As a co-founder with deep expertise in both software engineering and the automotive world, Bijit combines his technical skills and passion for cars to drive the innovation behind our AI-powered recommendation engine, ensuring every user gets the best car advice.
                </p>
                <Link href="https://www.instagram.com/bijit_piku/" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-orange-500 text-white hover:bg-orange-500/20"
                  >
                    <Instagram className="h-4 w-4 text-orange-500" />
                    Follow on Instagram
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-4 text-white">
              Our <span className="text-orange-500">Vision</span>
            </h2>

            <div className="h-1 w-16 bg-orange-500 mx-auto mb-8"></div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
              <p className="text-lg mb-4 text-white/90">
                We envision a future where every Indian car buyer can make confident, informed decisions about their
                vehicle purchases, supported by personalized AI recommendations that understand their unique needs and
                preferences.
              </p>
              <p className="text-lg text-white/90">
                Car Guru India is committed to continuously improving our technology and expanding our knowledge base to
                provide the most accurate and helpful car recommendations for the diverse Indian market.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
