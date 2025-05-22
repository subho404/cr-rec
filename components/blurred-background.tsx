"use client"

import type { ReactNode } from "react"
import Image from "next/image"

interface BlurredBackgroundProps {
  children: ReactNode
}

export default function BlurredBackground({ children }: BlurredBackgroundProps) {
  return (
    <div className="relative min-h-screen">
      {/* Blurred Background Image - src left empty for you to fill */}
      <div className="fixed inset-0 z-0">
        <Image src="/placeholder.svg" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
