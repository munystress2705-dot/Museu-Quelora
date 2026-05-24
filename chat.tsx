import { useState, useEffect, useRef } from "react"
import { sendMessage, listenToChat } from "../museum/chatMuseum"
import { checkIfUserIsBanned } from "../moderation/userBan"

export default function ChatMuseum() {
  const [messages, setMessages] = useState<any[]>([])
  const [inputText, setInputText] = useState("")
  const [userId] = useState("user_" + Math.random().toString(36).substr(2, 9)) // Gera um ID temporário para teste
  const [userName] = useState("Visitante Retrô")
  const [isBanned, setIsBanned] = useState(false)
  const [loading, setLoading] = useState(true)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // 1. Monitora o chat em tempo real e checa se o usuário está banido
  useEffect(() => {
    async function verifyBan() {
      const banned = await checkIfUserIsBanned(userId)
      setIsBanned(banned)
      setLoading(false)
    }

    verifyBan()

    // Abre a conexão em tempo real com as mensagens do Firebase
    const unsubscribe = listenToChat((data) => {
      setMessages(data)
    })

    return () => unsubscribe() // Fecha a conexão ao sair da página
  }, [userId])

  // 2. Rola o chat para baixo automaticamente quando chega mensagem nova
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 3. Função para enviar a mensagem
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    // Segurança extra: checa se foi banido antes de deixar enviar
    const banned = await checkIfUserIsBanned(userId)
    if (banned) {
      setIsBanned(true)
      alert("Você está banido por 1 dia e não pode enviar mensagens.")
      return
    }

    const res = await sendMessage(userId, userName, inputText)
    
    if (!res.success) {
      alert(`Não enviado: ${res.reason || "Erro desconhecido"}`)
    } else {
      setInputText("")
    }
  }

  if (loading) return <div className="flex h-screen items-center justify-center">Carregando Pixel Chat...</div>
  if (isBanned) return <div className="flex h-screen items-center justify-center text-red-500 font-bold">Você foi suspenso por 1 dia por violar as regras do chat.</div>

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto border-x border-slate-700 bg-slate-900">
      {/* Topo do Chat */}
      <div className="p-4 border-b border-slate-700 bg-slate-800 text-center font-bold text-lg text-emerald-400 tracking-wider">
        🏛️ CHAT AO VIVO - MUSEU 🏛️
      </div>

      {/* Área das Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
            <span className="text-purple-400 font-bold text-sm block mb-1">{msg.userName}</span>
            <p className="text-slate-200 text-sm break-words">{msg.text}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input de Texto */}
      <form onSubmit={handleSend} className="p-4 border-t border-slate-700 bg-slate-800 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Digite sua mensagem respeitando as regras..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded text-sm transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
