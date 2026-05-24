import { GoogleGenAI } from "@google/generative-ai";
import { v2 as cloudinary } from "cloudinary";

// 1. Configuração do Gemini (O Segurança)
const GEMINI_API_KEY = "AIzaSyBb8DSbiOsBXRT2_FHWIdwCnqyAFjbNDZ4";
const genAI = new GoogleGenAI(GEMINI_API_KEY);

// 2. Configuração do Cloudinary (O Arquivo de Fotos)
cloudinary.config({
  cloud_name: "dvrmzltro",
  api_key: "151432314926422",
  api_secret: "2XPRhcsgs-chp3f4eQGiv8oZWBo"
});

/**
 * FUNÇÃO CENTRAL: Modera a imagem com o Gemini e, se for segura, envia para o Cloudinary.
 * @param base64Image A imagem enviada pelo usuário em formato Base64.
 * @returns O link da imagem no Cloudinary se for segura, ou null se for bloqueada.
 */
export async function uploadSecureImage(base64Image: string): Promise<string | null> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Instruções rígidas para o Gemini barrar o que for ruim
    const prompt = 
      "Analise esta imagem enviada por um usuário no site do Museu Quelora. " +
      "Responda APENAS com a palavra 'true' se a imagem for totalmente segura, amigável e livre de conteúdo adulto, violência, armas, drogas ou ofensas. " +
      "Se a imagem contiver QUALQUER coisa inadequada, perigosa ou ofensiva, responda APENAS com 'false'. Não adicione nenhuma outra palavra ou pontuação.";

    const imagePart = {
      inlineData: {
        data: base64Image.split(",")[1] || base64Image, // Limpa o cabeçalho da imagem se houver
        mimeType: "image/jpeg"
      },
    };

    // O Gemini analisa a foto
    const result = await model.generateContent([prompt, imagePart]);
    const isSafe = result.response.text().trim().toLowerCase().includes("true");

    // Se a IA detectou que a imagem é inadequada, bloqueia aqui e nem gasta o Cloudinary
    if (!isSafe) {
      console.warn("Segurança: Imagem bloqueada pelo filtro do Gemini.");
      return null; 
    }

    // Se o Gemini aprovou (true), fazemos o upload para o Cloudinary
    console.log("Segurança: Imagem aprovada! Enviando para o Cloudinary...");
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "museu_quelora_uploads" // Organiza todas as fotos do site nesta pasta
    });

    // Devolve o link seguro da foto para o site usar
    return uploadResult.secure_url;

  } catch (error) {
    console.error("Erro no processo de upload seguro:", error);
    // Em caso de erro técnico na IA ou no Cloudinary, bloqueia por segurança
    return null;
  }
}
