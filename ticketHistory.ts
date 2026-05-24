import { app } from "../database/firebase"
import { getFirestore, collection, query, where, orderBy, getDocs } from "firebase/firestore"

const db = getFirestore(app)

// Função para buscar todos os tickets de um usuário específico
export async function getUserTickets(userId: string) {
  try {
    const q = query(
      collection(db, "tickets"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    )
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error("Erro ao buscar histórico de tickets do usuário:", error)
    return []
  }
}

// Função para o administrador listar TODOS os tickets que estão abertos no sistema
export async function getOpenTicketsForAdmin() {
  try {
    const q = query(
      collection(db, "tickets"),
      where("status", "==", "aberto"),
      orderBy("createdAt", "asc") // Mostra os mais antigos primeiro para o admin responder na ordem
    )
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error("Erro ao buscar tickets abertos para o admin:", error)
    return []
  }
}
