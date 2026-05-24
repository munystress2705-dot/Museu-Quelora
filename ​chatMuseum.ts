import { app } from "../database/firebase"
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot } from "firebase/firestore"
import { checkMessageWithAI } from "../moderation/badwords"

const db = getFirestore(app)

// Função para enviar uma mensagem no chat do museu
export async function sendMessage(userId: string, userName: string, text: string) {
  try {
    // 1. Passa a mensagem pela IA de moderação antes de enviar
    const isToxic = await checkMessageWithAI(text)
    
    if (isToxic) {
      console.log("Mensagem bloqueada pelo sistema de moderação.")
      return { success: false, reason: "Mensagem inadequada" }
    }

    // 2. Se estiver limpa, salva no Firebase
    await addDoc(collection(db, "museumChat"), {
      userId,
      userName,
      text,
      timestamp: new Date().toISOString()
    })

    return { success: true }
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error)
    return { success: false, error }
  }
}

// Função para carregar as mensagens na tela em tempo real
export function listenToChat(callback: (messages: any[]) => void) {
  const q = query(collection(db, "museumChat"), orderBy("timestamp", "asc"), limit(50))
  
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    callback(messages)
  })
}
