"use client"
import { useState } from "react"

interface LogAlteracao {
  id: string
  comando: string
  data: string
}

export default function AdminPanel() {
  const [comandoSupremo, setComandoSupremo] = useState("")
  const [status, setStatus] = useState("")
  const [historico, setHistorico] = useState<LogAlteracao[]>([])

  async function executarComandoIA() {
    if (!comandoSupremo.trim()) return
    
    setStatus("IA Suprema processando ordens...")
    
    try {
      // Faz o envio seguro para a rota da API
      const response = await fetch("/api/admin-supreme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: comandoSupremo })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStatus("Alteração processada pela IA com sucesso! 🚀")
        setHistorico([
          {
            id: Date.now().toString(),
            comando: comandoSupremo,
            data: new Date().toLocaleTimeString()
          },
          ...historico
        ])
        setComandoSupremo("")
      } else {
        setStatus("A IA Suprema não conseguiu processar o comando.")
      }
    } catch (error) {
      console.error(error)
      setStatus("Erro ao acionar os comandos da IA.")
    }
  }

  async function desfazerAlteracao(id: string) {
    setStatus("Revertendo sistema para o estado anterior... ↩️")
    setTimeout(() => {
      setHistorico(historico.filter(item => item.id !== id))
      setStatus("Sistema restaurado!")
    }, 1500)
  }

  return (
    <div className="pixel-box">
      {/* SEUS BOTÕES ORIGINAIS DO SEU JEITO */}
      <h1 className="pixel-text text-2xl mb-6">ADMIN MASTER</h1>
      <div className="grid grid-cols-2 gap-4">
        <button className="pixel-button">ADICIONAR OBJETO</button>
        <button className="pixel-button">REMOVER OBJETO</button>
        <button className="pixel-button">MANUTENÇÃO</button>
        <button className="pixel-button">MODERAR CHAT</button>
        <button className="pixel-button">LOGS</button>
        <button className="pixel-button">TICKETS</button>
      </div>

      {/* PARTE DA IA SUPREMA ADICIONADA ABAIXO */}
      <div className="mt-8 border-t border-white pt-6">
        <h2 className="pixel-text text-xl mb-4 text-cyan-400">🧠 COMANDO DA IA SUPREMA</h2>
        <textarea
          className="w-full h-[100px] bg-black border border-cyan-400 p-4 pixel-text text-white focus:outline-none"
          value={comandoSupremo}
          onChange={(e) => setComandoSupremo(e.target.value)}
          placeholder="Digite as ordens para a IA..."
        />
        <button 
          onClick={executarComandoIA} 
          className="pixel-button w-full mt-4 bg-cyan-900 border border-white text-white p-2 hover:bg-cyan-400 hover:text-black"
        >
          EXECUTAR COMANDO 🔥
        </button>
        {status && <p className="mt-4 text-sm text-yellow-300 pixel-text">{status}</p>}
      </div>

      {/* HISTÓRICO DE BACKUP (ROLLBACK) */}
      <div className="mt-8 border-t border-white pt-6">
        <h2 className="pixel-text text-xl mb-4 text-red-400">↩️ HISTÓRICO (ROLLBACK)</h2>
        {historico.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Nenhuma alteração feita.</p>
        ) : (
          <div className="space-y-2">
            {historico.map((item) => (
              <div key={item.id} className="border border-gray-700 p-3 flex justify-between items-center bg-black">
                <div>
                  <p className="text-xs text-gray-400">[{item.data}] Comando:</p>
                  <p className="text-sm text-white font-mono">"{item.comando}"</p>
                </div>
                <button 
                  onClick={() => desfazerAlteracao(item.id)}
                  className="bg-red-900 text-white border border-white px-3 py-1 text-xs pixel-text hover:bg-red-500"
                >
                  DESFAZER 🚨
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
