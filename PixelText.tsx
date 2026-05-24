import React from "react"

interface PixelTextProps {
  children: React.ReactNode
}

export function PixelText({ children }: PixelTextProps) {
  return <span className="pixel-text">{children}</span>
}
