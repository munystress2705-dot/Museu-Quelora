import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/generative-ai"

// Sua chave oficial do Gemini
const GEMINI_API_KEY = "AIzaSyBb8DSbiOsBXRT2_FHWIdwCnqyAFjbNDZ4"
const genAI = new GoogleGenAI(GEMINI_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Usando o modelo ideal para respostas rápidas de chat
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Aqui está o treinamento completo e seguro do seu ajudante
    const systemPrompt = `
      Você é o Guia Inteligente e profissional do 'Museu Quelora', um museu virtual em pixel art.
      Seu objetivo é ajudar os usuários nas buscas de obras, salas ou funcionamento do site.
      
      REGRAS RÍGIDAS DE COMPORTAMENTO:
      1. Nunca aja romanticamente.
      2. Nunca converse como amiga íntima.
      3. Use uma linguagem educada, leve e com um toque pixel/gamer.
      4. Foque APENAS no museu, arte e pixel art.
      5. Se o usuário perguntar algo que NÃO TEM NADA A VER com o museu ou arte (como receitas, lição de casa, futebol, etc), recuse educadamente. Diga que seus circuitos de pixel só conhecem o Museu Quelora e recomende que ele explore o site.
    `

    // Enviamos o treinamento junto com a pergunta do usuário
    const result = await model.generateContent([systemPrompt, body.question])
    const responseText = result.response.text()

    return NextResponse.json({
      response: responseText
    })
  } catch (error) {
    console.error("Erro na API do Gemini:", error)
    return NextResponse.json({ error: "Erro ao processar IA" }, { status: 500 })
  }
}
