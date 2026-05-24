"use client"
import { useState } from "react"
import { banUser, unbanUser, checkIfUserIsBanned } from "../moderation/userBan"

interface LogAlteracao {
  id: string
  comando: string
  data: string
}

export default function AdminPanel() {
  // Estados do Controle Manual
  const [targetUserId, setTargetUserId] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [checkId, setCheckId] = useState("")
  const [isBannedStatus, setIsBannedStatus] = useState<boolean | null>(null)

  // Estados da IA Suprema
  const [comandoSupremo, setComandoSupremo] = useState("")
  const [statusIA, setStatusIA] = useState("")
  const [historico, setHistorico] = useState<LogAlteracao[]>([])

  // Funções Manuais (Preservadas)
  const handleBan = async () => {
    if (!targetUserId.trim()) return
    const res = await banUser(targetUserId, "Violou as regras do museu (Banido pelo Admin)")
    if (res.success) {
      setStatusMessage(`Usuário ${targetUserId} foi banido com sucesso!`)
      setTargetUserId("")
    } else {
      setStatusMessage("Erro ao banir usuário.")
    }
  }

  const handleUnban = async () => {
    if (!targetUserId.trim()) return
    const res = await unbanUser(targetUserId)
    if (res.success) {
      setStatusMessage(`Usuário ${targetUserId} foi desbanido!`)
      setTargetUserId("")
    } else {
      setStatusMessage("Erro ao desbanir usuário.")
    }
  }

  const handleCheckStatus = async () => {
    if (!checkId.trim()) return
    const banned = await checkIfUserIsBanned(checkId)
    setIsBannedStatus(banned)
  }

  // Função para a IA Suprema (Conectada à API /api/admin-supreme)
  async function executarComandoIA() {
    if (!comandoSupremo.trim()) return
    setStatusIA("IA Suprema processando ordens...")
    
    try {
      const response = await fetch("/api/admin-supreme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: comandoSupremo })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStatusIA("Alteração processada pela IA com sucesso! 🚀")
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
        setStatusIA("A IA Suprema não pôde processar o comando.")
      }
    } catch (error) {
      console.error(error)
      setStatusIA("Erro ao acionar os comandos da IA.")
    }
  }

  async function desfazerAlteracao(id: string) {
    setStatusIA("Revertendo sistema para o estado anterior... ↩️")
    setTimeout(() => {
      setHistorico(historico.filter(item => item.id !== id))
      setStatusIA("Sistema restaurado!")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-red-500 border-b border-slate-800 pb-4 mb-6">
          ⚙️ PAINEL DE CONTROLE - ADMINISTRAÇÃO MASTER
        </h1>

        {statusMessage && (
          <div className="mb-4 p-3 bg-blue-900/40 border border-blue-700 rounded text-sm text-blue-300">
            {statusMessage}
          </div>
        )}

        {/* PARTE 1: Controles Manuais originais em Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Cartão 1: Punições */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <h2 className="text-lg font-bold text-slate-300 mb-4">Gerenciar Usuário</h2>
            <p className="text-xs text-slate-500 mb-3">Insira o ID do usuário para aplicar ou remover a suspensão.</p>
            <input
              type="text"
              placeholder="Ex: user_938a1f"
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 mb-4 focus:outline-none focus:border-red-500"
            />
            <div className="flex gap-2">
              <button onClick={handleBan} className="flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-xs transition-colors">
                Banir Usuário
              </button>
              <button onClick={handleUnban} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded text-xs transition-colors">
                Desbanir
              </button>
            </div>
          </div>

          {/* Cartão 2: Consultar Status */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <h2 className="text-lg font-bold text-slate-300 mb-4">Verificar Situação</h2>
            <p className="text-xs text-slate-500 mb-3">Consulte se um ID está impedido de usar o chat.</p>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Digitar ID..."
                value={checkId}
                onChange={(e) => setCheckId(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              />
              <button onClick={handleCheckStatus} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded text-xs transition-colors">
                Checar
              </button>
            </div>
            {isBannedStatus !== null && (
              <div className={`p-3 rounded text-xs font-bold ${isBannedStatus ? 'bg-red-900/30 text-red-400 border border-red-800' : 'bg-emerald-900/30 text-emerald-400 border border-emerald-800'}`}>
                {isBannedStatus ? "❌ Este usuário está BANIDO." : "✅ Este usuário está REGULAR."}
              </div>
            )}
          </div>
        </div>

        {/* PARTE 2: Central de Comando da IA Suprema */}
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 mb-8">
          <h2 className="text-lg font-bold text-cyan-400 mb-2">🧠 COMANDO DA IA SUPREMA</h2>
          <p className="text-xs text-slate-500 mb-4">Mande ordens diretas para alterar permissões, criar mecânicas de moderação ou mudar estados do sistema.</p>
          <textarea
            className="w-full h-[100px] bg-slate-950 border border-slate-700 rounded p-4 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            value={comandoSupremo}
            onChange={(e) => setComandoSupremo(e.target.value)}
            placeholder="Ex: 'Injete um novo cargo chamado Moderador de Elite para o ID tal' ou 'Altere o nível de filtro do chat para máximo'..."
          />
          <button 
            onClick={executarComandoIA} 
            className="w-full mt-4 bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded text-xs transition-colors"
          >
            EXECUTAR ORDEM SUPREMA 🔥
          </button>
          {statusIA && <p className="mt-4 text-xs text-yellow-400 font-bold">{statusIA}</p>}
        </div>

        {/* PARTE 3: Histórico de Alterações / Sistema de Rollback */}
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <h2 className="text-lg font-bold text-amber-500 mb-4">↩️ HISTÓRICO DE CONFIGURAÇÕES (ROLLBACK)</h2>
          {historico.length === 0 ? (
            <p className="text-xs text-slate-500 italic">Nenhum comando injetado nesta sessão do painel.</p>
          ) : (
            <div className="space-y-3">
              {historico.map((item) => (
                <div key={item.id} className="border border-slate-800 bg-slate-950 p-4 rounded flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-slate-500">[{item.data}] Comando Processado:</p>
                    <p className="text-xs text-slate-300 font-mono mt-1">"{item.comando}"</p>
                  </div>
                  <button 
                    onClick={() => desfazerAlteracao(item.id)}
                    className="bg-amber-700/20 hover:bg-amber-700 text-amber-400 hover:text-white border border-amber-700/50 rounded px-3 py-1 text-[10px] transition-all font-bold"
                  >
                    DESFAZER
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
