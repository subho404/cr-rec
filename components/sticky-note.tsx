"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface StickyNoteProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}

export default function StickyNote({ icon, title, description, delay = 0 }: StickyNoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.05,
        rotate: 2,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-xs relative"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 95%, 95% 100%, 0% 100%)",
      }}
    >
      {/* Sticky note pin */}
      <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-gray-200 border-2 border-gray-300 shadow-sm" />

      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-gray-100 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}
