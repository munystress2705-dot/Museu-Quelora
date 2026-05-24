"use client"

import { useState } from "react"

export default function ChatBox() {

  const [message, setMessage] = useState("")

  function sendMessage() {

    if (!message) return

    console.log(message)

    setMessage("")
  }

  return (
    <div className="pixel-box">

      <h2 className="pixel-text mb-4">
        CHAT AO VIVO
      </h2>

      <div className="h-[300px] overflow-y-auto border border-white p-3 mb-4">
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-3 bg-black border border-white pixel-text"
        placeholder="Digite..."
      />

      <button
        onClick={sendMessage}
        className="pixel-button w-full mt-3"
      >
        ENVIAR
      </button>

    </div>
  )
}