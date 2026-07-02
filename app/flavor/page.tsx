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
  const [cached, setCached] = useState(false)

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
      if (data._meta?.profileSource === 'cache') setCached(true)
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
    <main className="min-h-[100dvh] bg-[#F7F6F2]">

      {/* Sticky nav — safe on iPhone notch */}
      <div className="sticky top-0 z-10 bg-[#F7F6F2]/90 backdrop-blur-sm border-b border-[#EEECEA] px-5 py-3 flex items-center justify-between">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1 text-[13px] text-[#999] active:text-[#555] transition-colors touch-manipulation py-2 -ml-1 pr-3"
        >
          ← Back
        </button>
        <span className="font-display text-[16px] text-[#1A1A1A]">FlavorIQ</span>
        {cached && (
          <span className="text-[10px] text-[#C0BDB5] uppercase tracking-wider">cached</span>
        )}
        {!cached && <div className="w-12" />}
      </div>

      <div className="px-5 py-6 max-w-lg mx-auto">

        {/* Error */}
        {error && (
          <div className="rounded-2xl bg-red-50 border border-red-200 p-4 mb-6">
            <p className="text-[13px] text-red-700 mb-2">{error}</p>
            <button
              onClick={() => fetchData(main, pantry)}
              className="text-[12px] text-red-500 underline touch-manipulation"
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

            {/* Pantry check input */}
            {!pantry && (
              <div className="mt-8">
                <div className="border-t border-[#EEECEA] mb-6" />
                <p className="text-[10px] font-medium text-[#aaa] uppercase tracking-widest mb-3">
                  Check a pairing
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    autoCapitalize="none"
                    value={pantryInput}
                    onChange={e => setPantryInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handlePantryCheck()}
                    placeholder={`What do you have with ${profile.name}?`}
                    className="flex-1 px-4 py-3.5 rounded-2xl border border-[#E0DED8] bg-white text-[#1A1A1A] placeholder:text-[#C0BDB5] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 text-[14px]"
                    style={{ WebkitAppearance: 'none' }}
                  />
                  <button
                    onClick={handlePantryCheck}
                    disabled={!pantryInput.trim()}
                    className="px-5 py-3.5 rounded-2xl bg-[#1A1A1A] text-white text-[14px] font-medium disabled:opacity-30 active:scale-[0.97] transition-all touch-manipulation"
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
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <button
                    onClick={() => router.push(`/flavor?main=${encodeURIComponent(main)}`)}
                    className="flex-1 py-4 rounded-2xl border border-[#E0DED8] text-[14px] text-[#555] active:bg-white transition-colors touch-manipulation"
                  >
                    Try another pairing
                  </button>
                  <button
                    onClick={() => router.push('/')}
                    className="flex-1 py-4 rounded-2xl bg-[#1A1A1A] text-[#F7F6F2] text-[14px] font-medium active:scale-[0.98] transition-all touch-manipulation"
                  >
                    New ingredient
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Safe area bottom padding for iPhone */}
      <div className="h-8" />
    </main>
  )
}

export default function FlavorPage() {
  return (
    <Suspense fallback={
      <main className="min-h-[100dvh] bg-[#F7F6F2] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#ddd] border-t-[#555] rounded-full animate-spin" />
      </main>
    }>
      <FlavorPageInner />
    </Suspense>
  )
}
