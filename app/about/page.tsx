import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">About Car Guru India</h1>

        <div className="mb-12">
          <p className="text-lg text-center mb-6">
            Car Guru India was founded with a simple mission: to help Indian car buyers find their perfect vehicle using
            the power of artificial intelligence and expert knowledge of the Indian automotive market.
          </p>
          <p className="text-lg text-center mb-6">
            Our platform combines cutting-edge AI technology with deep understanding of Indian roads, driving
            conditions, and car preferences to deliver personalized recommendations that truly match your needs.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8 text-primary">Meet Our Founders</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden flex flex-col">
            <div className="relative w-full pt-[75%]">
              <Image
                src="subham.png"
                alt="Subham Biswas"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Subham Biswas</CardTitle>
              <CardDescription>Co-Founder</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                Passionate about automobiles and technology, Subham brings his expertise in AI and deep knowledge of the
                Indian automotive market to help customers find their perfect car.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="https://www.instagram.com/subham4815/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Follow on Instagram
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden flex flex-col">
            <div className="relative w-full pt-[75%]">
              <Image
                src="bijit.png"
                alt="Bijit Sarkar"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Bijit Sarkar</CardTitle>
              <CardDescription>Co-Founder & CTO</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                With a background in software development and a love for cars, Bijit leads the technical development of
                our AI-powered recommendation engine to deliver accurate and personalized car suggestions.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="https://www.instagram.com/bijit_piku/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Follow on Instagram
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">Our Vision</h2>
          <p className="text-lg mb-4">
            We envision a future where every Indian car buyer can make confident, informed decisions about their vehicle
            purchases, supported by personalized AI recommendations that understand their unique needs and preferences.
          </p>
          <p className="text-lg">
            Car Guru India is committed to continuously improving our technology and expanding our knowledge base to
            provide the most accurate and helpful car recommendations for the diverse Indian market.
          </p>
        </div>
      </div>
    </div>
  )
}
