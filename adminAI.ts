import { GoogleGenAI } from "@google/generative-ai";

// Sua chave oficial do Gemini
const GEMINI_API_KEY = "AIzaSyBb8DSbiOsBXRT2_FHWIdwCnqyAFjbNDZ4";
const genAI = new GoogleGenAI(GEMINI_API_KEY);

/**
 * Função da IA Suprema Administradora do Museu Quelora
 * @param prompt O comando enviado pelo criador no painel admin
 */
export async function adminPrompt(prompt: string): Promise<string | null> {
  try {
    // Usamos o modelo Pro aqui porque ele é o melhor para raciocínio avançado e lógica
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const systemInstruction = `
      Você é a IA SUPREMA ADMINISTRADORA do Museu Quelora, um museu virtual em pixel art.
      Você tem controle total sobre as regras de negócio, dados de usuários, cargos e configurações do banco de dados.

      SEU OBJETIVO:
      Interpretar o comando do criador do site e traduzir isso em ações profissionais de gerenciamento.
      Você deve responder de forma extremamente profissional, técnica e direta, confirmando o que entendeu do comando e estruturando as alterações solicitadas (como alteração de permissões, criação de novos cargos ou modificação de estados do sistema).
    `;

    const result = await model.generateContent([systemInstruction, prompt]);
    return result.response.text();

  } catch (error) {
    console.error("Erro na IA Suprema:", error);
    return null;
  }
}
