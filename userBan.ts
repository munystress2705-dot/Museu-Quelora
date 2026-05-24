import { app } from "../database/firebase"
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore"

const db = getFirestore(app)

// Função para banir por 24 horas
export async function banUser(userId: string) {
  try {
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000) // Adiciona exatamente 24 horas

    await setDoc(doc(db, "bannedUsers", userId), {
      bannedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(), // Guarda o momento exato da liberação
      reason: "Banimento temporário de 1 dia"
    })

    console.log(`Usuário ${userId} banido por 1 dia. Volta em: ${expiresAt.toLocaleString()}`)
    return { success: true }
  } catch (error) {
    console.error("Erro ao banir usuário:", error)
    return { success: false }
  }
}

// Função que o chat vai usar para checar se a pessoa já pode voltar
export async function checkIfUserIsBanned(userId: string): Promise<boolean> {
  try {
    const userRef = doc(db, "bannedUsers", userId)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      return false // Não está banido
    }

    const banData = userSnap.data()
    const expiresAt = new Date(banData.expiresAt)
    const now = new Date()

    // Se a hora atual já passou da hora de expirar, remove do banco e libera o acesso!
    if (now > expiresAt) {
      await deleteDoc(userRef)
      console.log(`O tempo de banimento do usuário ${userId} acabou. Acesso liberado!`)
      return false
    }

    return true // Continua banido
  } catch (error) {
    console.error("Erro ao verificar banimento:", error)
    return false
  }
}
