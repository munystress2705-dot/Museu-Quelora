import { io } from "socket.io-client"

// Caso você configure um servidor Socket separado no futuro, basta colocar a URL dele aqui
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000"

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Ative como 'true' quando o servidor Socket estiver rodando
  transports: ["websocket"]
})

// Função auxiliar para conectar ao chat ao vivo do museu
export function connectToMuseumSocket(userId: string) {
  if (!socket.connected) {
    socket.auth = { userId }
    socket.connect()
    console.log(`Tentando conectar Socket para o usuário: ${userId}`)
  }
}

// Função auxiliar para desconectar
export function disconnectFromMuseumSocket() {
  if (socket.connected) {
    socket.disconnect()
    console.log("Socket do museu desconectado.")
  }
}
