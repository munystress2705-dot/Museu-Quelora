import { app } from "../database/firebase"
import { getFirestore, collection, addDoc, updateDoc, doc, query, where, getDocs } from "firebase/firestore"

const db = getFirestore(app)

// Função para o usuário abrir um novo chamado de suporte no museu
export async function createTicket(userId: string, userName: string, subject: string, message: string) {
  try {
    const newTicket = await addDoc(collection(db, "tickets"), {
      userId,
      userName,
      subject,
      message,
      status: "aberto", // Todo ticket começa como aberto
      createdAt: new Date().toISOString()
    })
    
    console.log(`Ticket criado com sucesso! ID: ${newTicket.id}`)
    return { success: true, ticketId: newTicket.id }
  } catch (error) {
    console.error("Erro ao criar ticket:", error)
    return { success: false, error }
  }
}

// Função para o admin fechar ou responder o chamado
export async function updateTicketStatus(ticketId: string, newStatus: "em_andamento" | "fechado") {
  try {
    const ticketRef = doc(db, "tickets", ticketId)
    await updateDoc(ticketRef, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    })
    
    console.log(`Status do ticket ${ticketId} atualizado para: ${newStatus}`)
    return { success: true }
  } catch (error) {
    console.error("Erro ao atualizar ticket:", error)
    return { success: false, error }
  }
}
