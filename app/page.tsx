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
    <main className="min-h-[100dvh] flex flex-col bg-[#F7F6F2]">

      {/* Top nav */}
      <div className="px-5 pt-12 pb-2">
        <h1 className="font-display text-[32px] leading-none text-[#1A1A1A]">FlavorIQ</h1>
        <p className="text-[11px] text-[#bbb] tracking-widest uppercase mt-1">Flavor intelligence</p>
      </div>

      {/* Hero */}
      <div className="px-5 pt-8 pb-6">
        <p className="text-[11px] text-[#aaa] uppercase tracking-widest mb-2">Flavor encyclopedia</p>
        <h2 className="font-display text-[26px] leading-snug text-[#1A1A1A] mb-2">
          Understand ingredients.<br />Cook confidently.
        </h2>
        <p className="text-[13px] text-[#777] leading-relaxed">
          Enter any ingredient to explore its flavor profile and discover what pairs with it.
        </p>
      </div>

      {/* Form */}
      <div className="px-5 flex-1">

        {/* Main ingredient */}
        <div className="mb-3">
          <label className="block text-[11px] font-medium text-[#777] mb-1.5">
            Main ingredient
          </label>
          <input
            type="text"
            inputMode="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            value={main}
            onChange={e => { setMain(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
            placeholder="e.g. cardamom, miso, tamarind…"
            className="w-full px-4 py-3.5 rounded-2xl border border-[#E0DED8] bg-white text-[#1A1A1A] placeholder:text-[#C0BDB5] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 text-[15px]"
            style={{ WebkitAppearance: 'none' }}
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
            inputMode="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            value={pantry}
            onChange={e => setPantry(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
            placeholder="Add to check compatibility…"
            className="w-full px-4 py-3.5 rounded-2xl border border-dashed border-[#E0DED8] bg-[#F7F6F2] text-[#1A1A1A] placeholder:text-[#C0BDB5] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 text-[15px]"
            style={{ WebkitAppearance: 'none' }}
          />
        </div>

        {error && (
          <p className="text-[13px] text-red-500 mb-3 px-1">{error}</p>
        )}

        {/* CTA — large touch target */}
        <button
          onClick={handleAnalyze}
          disabled={loading || !main.trim()}
          className="w-full py-4 rounded-2xl bg-[#1A1A1A] text-[#F7F6F2] text-[15px] font-medium disabled:opacity-40 active:scale-[0.98] transition-all touch-manipulation"
        >
          {loading ? 'Analyzing…' : 'Analyze flavor'}
        </button>

        <p className="text-center text-[11px] text-[#C0BDB5] mt-3">
          Flavor cards · Pairing scores · Regional context
        </p>

        {/* Suggestions */}
        <div className="mt-8">
          <p className="text-[11px] font-medium text-[#aaa] uppercase tracking-widest mb-3">Try these</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => setMain(s)}
                className="px-3.5 py-2 rounded-full text-[13px] bg-white border border-[#E0DED8] text-[#555] active:bg-[#EEECEA] transition-colors touch-manipulation"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Safe area bottom padding for iPhone */}
      <div className="h-8 shrink-0" />
    </main>
  )
}
