'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
    <main className="min-h-[100dvh] flex flex-col bg-[#F8F6F3]">

      {/* Nav */}
      <div className="px-6 pt-12 pb-2">
        <Link href="/" className="inline-block">
          <span className="font-display text-[26px] text-[#1A1714] tracking-wide">
            Flavor<span className="text-[#6B7355]">IQ</span>
          </span>
        </Link>
      </div>

      {/* Hero */}
      <div className="px-6 pt-10 pb-8">
        <p className="text-[13px] text-[#6B7355] uppercase tracking-[0.18em] mb-3 font-medium">
          Flavor intelligence
        </p>
        <h2 className="font-display italic text-[28px] leading-[1.45] text-[#1A1714] mb-3">
          Most cooks guess.<br />You won't have to.
        </h2>
        <p className="text-[13px] text-[#7A776E] leading-[1.8] font-light">
          Enter any ingredient and get its full flavor profile — heat, intensity, origin, and exactly what pairs with it.
        </p>
      </div>

      {/* Form */}
      <div className="px-6 flex-1">

        <div className="mb-3">
          <label className="block text-[14px] text-[#1A1714] mb-2 font-medium">
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
            className="w-full px-4 py-3.5 rounded-xl border border-[#E2DDD8] bg-[#F0EDE8] text-[#1A1714] placeholder:text-[#8B8880] focus:outline-none focus:ring-1 focus:ring-[#6B7355]/40 focus:border-[#6B7355]/40 text-[15px] transition font-normal"
            style={{ WebkitAppearance: 'none' }}
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-[14px] text-[#1A1714] font-medium">Pantry ingredient</label>
            <span className="text-[12px] text-[#9A9888] font-normal">optional</span>
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
            className="w-full px-4 py-3.5 rounded-xl border border-dashed border-[#E2DDD8] bg-[#F4F2EE] text-[#1A1714] placeholder:text-[#8B8880] focus:outline-none focus:ring-1 focus:ring-[#6B7355]/40 text-[15px] transition font-normal"
            style={{ WebkitAppearance: 'none' }}
          />
        </div>

        {error && <p className="text-[12px] text-[#A65D4E] mb-3 font-light">{error}</p>}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-[#1A1714] text-[#F8F6F3] text-[12px] tracking-[0.1em] uppercase font-normal disabled:opacity-40 active:scale-[0.99] transition-all touch-manipulation"
        >
          {loading ? 'Analyzing…' : 'Analyze flavor'}
        </button>

        <p className="text-center text-[10px] text-[#C4C1BA] mt-4 tracking-[0.06em] font-light">
          Flavor cards · Pairing analysis · Regional context
        </p>

        {/* Suggestions */}
        <div className="mt-10">
          <p className="text-[14px] text-[#1A1714] mb-3 font-medium">Try these</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => setMain(s)}
                className="px-4 py-2 rounded-full text-[12px] bg-[#F0EDE8] border border-[#E8E4DF] text-[#7A776E] active:bg-[#EDEAE5] transition-colors touch-manipulation font-light"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-10 shrink-0" />
    </main>
  )
}
