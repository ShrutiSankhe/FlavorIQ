'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import FlavorCard from '@/components/FlavorCard'
import PairingVerdict from '@/components/PairingVerdict'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import type { FlavorProfile, PairingResult } from '@/lib/types'

function FlavorPageInner() {
  const router = useRouter()
  const params = useSearchParams()
  const main = params.get('main') || ''
  const pantry = params.get('pantry') || ''

  const [profile, setProfile] = useState<FlavorProfile | null>(null)
  const [pairing, setPairing] = useState<PairingResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pantryInput, setPantryInput] = useState('')
  const [checkingPantry, setCheckingPantry] = useState(false)

  useEffect(() => {
    if (!main) { router.push('/'); return }
    fetchData(main, pantry)
  }, [main, pantry])

  const fetchData = async (ingredient: string, pantryItem?: string) => {
    setLoading(true)
    setError('')
    setProfile(null)
    setPairing(null)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ main: ingredient, pantry: pantryItem || '' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setProfile(data.profile)
      if (data.pairing) setPairing(data.pairing)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePantryCheck = () => {
    if (!pantryInput.trim()) return
    const p = new URLSearchParams({ main, pantry: pantryInput.trim() })
    router.push(`/flavor?${p.toString()}`)
  }

  return (
    <main className="min-h-screen bg-[#F7F6F2] px-5 py-10">
      <div className="w-full max-w-[420px] mx-auto">

        {/* Nav */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1.5 text-[13px] text-[#999] hover:text-[#555] transition-colors"
          >
            ← Back
          </button>
          <span className="font-display text-[16px] text-[#1A1A1A]">FlavorIQ</span>
          <div className="w-12" />
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 mb-6">
            <p className="text-[13px] text-red-700">{error}</p>
            <button
              onClick={() => fetchData(main, pantry)}
              className="text-[12px] text-red-500 underline mt-2"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && <LoadingSkeleton ingredient={main} />}

        {/* Results */}
        {!loading && profile && (
          <>
            <FlavorCard profile={profile} />

            {pairing && pantry && (
              <PairingVerdict main={main} pantry={pantry} result={pairing} />
            )}

            {/* Pantry check input — only shown if no pantry check yet */}
            {!pantry && (
              <div className="mt-8">
                <div className="border-t border-[#EEECEA] mb-6" />
                <p className="text-[10px] font-medium text-[#aaa] uppercase tracking-widest mb-3">Check a pairing</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pantryInput}
                    onChange={e => setPantryInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handlePantryCheck()}
                    placeholder={`What do you have with ${profile.name}?`}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#E0DED8] bg-white text-[#1A1A1A] placeholder:text-[#C0BDB5] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 text-[13px]"
                  />
                  <button
                    onClick={handlePantryCheck}
                    disabled={!pantryInput.trim()}
                    className="px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-[13px] font-medium disabled:opacity-30 hover:bg-[#333] transition-colors"
                  >
                    Check
                  </button>
                </div>
              </div>
            )}

            {/* Try another */}
            {pantry && (
              <div className="mt-8">
                <div className="border-t border-[#EEECEA] mb-6" />
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/flavor?main=${encodeURIComponent(main)}`)}
                    className="flex-1 py-3 rounded-xl border border-[#E0DED8] text-[13px] text-[#555] hover:bg-white transition-colors"
                  >
                    Try another pairing
                  </button>
                  <button
                    onClick={() => router.push('/')}
                    className="flex-1 py-3 rounded-xl bg-[#1A1A1A] text-[#F7F6F2] text-[13px] font-medium hover:bg-[#333] transition-colors"
                  >
                    New ingredient
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  )
}

export default function FlavorPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#ddd] border-t-[#555] rounded-full animate-spin" />
      </main>
    }>
      <FlavorPageInner />
    </Suspense>
  )
}
