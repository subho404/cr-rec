"use client"

import { useEffect, useState } from "react"

export function DebugEnv() {
  const [envStatus, setEnvStatus] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Check if environment variables are defined
    setEnvStatus({
      NEXT_PUBLIC_EMAILJS_SERVICE_ID: !!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: !!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    })
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-black/80 text-white rounded-lg text-xs z-50">
      <h4 className="font-bold mb-2">Environment Variables:</h4>
      <ul>
        {Object.entries(envStatus).map(([key, exists]) => (
          <li key={key} className={exists ? "text-green-400" : "text-red-400"}>
            {key}: {exists ? "✓" : "✗"}
          </li>
        ))}
      </ul>
    </div>
  )
}
