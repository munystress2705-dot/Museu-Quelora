"use client"
import { useState } from "react"

export default function VisitorAI() {
  const [question, setQuestion] = useState("")

  async function askAI() {
    const response = await fetch("/api/visitor-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <div className="pixel-box">
      <h2 className="pixel-text mb-4">GUIA DO MUSEU</h2>
      <textarea
        className="w-full h-[200px] bg-black border border-white p-4 pixel-text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={askAI} className="pixel-button w-full mt-4">
        PERGUNTAR
      </button>
    </div>
  )
}
