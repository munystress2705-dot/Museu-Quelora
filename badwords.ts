import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Esta função usa a IA da OpenAI para analisar se a mensagem é tóxica ou inadequada
export async function checkMessageWithAI(text: string): Promise<boolean> {
  try {
    const response = await openai.moderations.create({
      input: text
    })

    // Retorna 'true' se a IA sinalizar que a mensagem viola as regras de conteúdo
    return response.results[0].flagged
  } catch (error) {
    console.error("Erro ao verificar moderação com a IA:", error)
    // Se a API falhar, bloqueia por segurança ou deixa passar dependendo da sua preferência
    return false 
  }
}
