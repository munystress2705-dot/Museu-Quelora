import Link from "next/link"

export default function HomeMuseum() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-slate-100 px-4">
      {/* Container Principal */}
      <div className="text-center max-w-md p-8 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-emerald-400 tracking-wide mb-4">
          🏛️ MUSEU PIXEL 🏛️
        </h1>
        
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Bem-vindo ao espaço digital do museu! Explore nossas galerias, conheça as artes exclusivas e converse em tempo real com outros visitantes no nosso chat moderado por IA.
        </p>

        {/* Botão para entrar no Chat */}
        <Link href="/chat">
          <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-900/40">
            Entrar no Chat ao Vivo
          </button>
        </Link>
      </div>
    </div>
  )
}
