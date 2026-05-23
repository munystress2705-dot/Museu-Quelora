"use client"

import { motion } from "framer-motion"
import ChatBox from "@/components/ChatBox"
import MuseumRooms from "@/components/MuseumRooms"
import VisitorAI from "@/components/VisitorAI"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-6 scanlines">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pixel-box"
      >
        <h1 className="text-3xl pixel-text mb-6">
          MUSEU QUELORA
        </h1>

        <p className="pixel-text text-sm leading-8">
          Um museu digital experimental em pixel art.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <MuseumRooms />
        <ChatBox />
        <VisitorAI />
      </div>

    </main>
  )
}

