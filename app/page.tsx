'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SUGGESTIONS = ['Cardamom', 'Miso', 'Tamarind', 'Saffron', 'Sumac', 'Tahini', 'Yuzu', 'Mirin']

export default function HomePage() {
  const router = useRouter()
  const [main, setMain] = useState('')
  const [pantry, setPantry] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = () => {
    const trimmed = main.trim()
    if (!trimmed) { setError('Please enter an ingredient.'); return }
    setError('')
    setLoading(true)
    const params = new URLSearchParams({ main: trimmed })
    if (pantry.trim()) params.set('pantry', pantry.trim())
    router.push(`/flavor?${params.toString()}`)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 py-16 bg-[#F7F6F2]">
      <div className="w-full max-w-[420px]">

        {/* Logo */}
        <div className="mb-10">
          <h1 className="font-display text-[38px] leading-none text-[#1A1A1A] mb-1">FlavorIQ</h1>
          <p className="text-[12px] text-[#999] tracking-widest uppercase">Flavor intelligence</p>
        </div>

        {/* Hero */}
        <div className="mb-9">
          <p className="text-[11px] text-[#aaa] uppercase tracking-widest mb-2">Flavor encyclopedia</p>
          <h2 className="font-display text-[28px] leading-snug text-[#1A1A1A] mb-3">
            Understand ingredients.<br />Cook confidently.
          </h2>
          <p className="text-[13px] text-[#777] leading-relaxed">
            Enter any ingredient to explore its flavor profile and discover what pairs with it.
          </p>
        </div>

        {/* Main ingredient */}
        <div className="mb-3">
          <label className="block text-[11px] font-medium text-[#777] mb-1.5">Main ingredient</label>
          <input
            type="text"
            value={main}
            onChange={e => { setMain(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
            placeholder="e.g. cardamom, miso, tamarind…"
            className="w-full px-4 py-3 rounded-xl border border-[#E0DED8] bg-white text-[#1A1A1A] placeholder:text-[#C0BDB5] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 text-[14px] transition"
          />
        </div>

        {/* Pantry ingredient */}
        <div className="mb-5">
          <div className="flex justify-between mb-1.5">
            <label className="text-[11px] font-medium text-[#777]">Pantry ingredient</label>
            <span className="text-[11px] text-[#C0BDB5]">optional</span>
          </div>
          <input
            type="text"
            value={pantry}
            onChange={e => setPantry(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
            placeholder="Add to check compatibility…"
            className="w-full px-4 py-3 rounded-xl border border-dashed border-[#E0DED8] bg-[#F7F6F2] text-[#1A1A1A] placeholder:text-[#C0BDB5] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 text-[14px] transition"
          />
        </div>

        {error && <p className="text-[12px] text-red-500 mb-3">{error}</p>}

        {/* CTA */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-[#F7F6F2] text-[14px] font-medium disabled:opacity-40 hover:bg-[#333] transition-colors"
        >
          {loading ? 'Analyzing…' : 'Analyze flavor'}
        </button>

        <p className="text-center text-[11px] text-[#C0BDB5] mt-3">
          Flavor cards · Pairing scores · Regional context
        </p>

        {/* Suggestions */}
        <div className="mt-10">
          <p className="text-[11px] font-medium text-[#aaa] uppercase tracking-widest mb-3">Try these</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => setMain(s)}
                className="px-3 py-1.5 rounded-full text-[12px] bg-white border border-[#E0DED8] text-[#555] hover:bg-[#EEECEA] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
