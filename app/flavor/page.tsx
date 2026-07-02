'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
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
    <main className="min-h-[100dvh] bg-[#F8F6F3]">

      {/* Sticky nav */}
      <div className="sticky top-0 z-10 bg-[#F8F6F3]/95 backdrop-blur-sm border-b border-[#E8E4DF] px-6 py-3.5 flex items-center justify-between">
        <button
          onClick={() => router.push('/')}
          className="text-[12px] text-[#9A9888] active:text-[#7A776E] transition-colors touch-manipulation py-2 pr-3 font-light"
        >
          ← Back
        </button>
        <Link href="/">
          <span className="font-display text-[17px] text-[#1A1714] tracking-wide">
            Flavor<span className="text-[#6B7355]">IQ</span>
          </span>
        </Link>
        {cached ? (
          <span className="text-[9px] text-[#C4C1BA] uppercase tracking-[0.14em] font-light w-12 text-right">cached</span>
        ) : (
          <div className="w-12" />
        )}
      </div>

      <div className="px-6 py-8 max-w-lg mx-auto">

        {error && (
          <div className="rounded-xl bg-[#F5EDEA] border border-[#E5D5CE] p-4 mb-6">
            <p className="text-[13px] text-[#A65D4E] mb-2 font-light">{error}</p>
            <button
              onClick={() => fetchData(main, pantry)}
              className="text-[12px] text-[#A65D4E] underline touch-manipulation font-light"
            >
              Try again
            </button>
          </div>
        )}

        {loading && <LoadingSkeleton ingredient={main} />}

        {!loading && profile && (
          <>
            <FlavorCard profile={profile} />

            {pairing && pantry && (
              <PairingVerdict main={main} pantry={pantry} result={pairing} />
            )}

            {!pantry && (
              <div className="mt-10">
                <div className="border-t border-[#E8E4DF] mb-8" />
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#5A564E] mb-3 font-medium">
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
                    className="flex-1 px-4 py-3.5 rounded-xl border border-[#E2DDD8] bg-[#F0EDE8] text-[#1A1714] placeholder:text-[#8B8880] focus:outline-none focus:ring-1 focus:ring-[#6B7355]/40 text-[13px] font-light"
                    style={{ WebkitAppearance: 'none' }}
                  />
                  <button
                    onClick={handlePantryCheck}
                    disabled={!pantryInput.trim()}
                    className="px-5 py-3.5 rounded-xl bg-[#1A1714] text-[#F8F6F3] text-[11px] uppercase tracking-[0.08em] disabled:opacity-30 active:scale-[0.98] transition-all touch-manipulation"
                  >
                    Check
                  </button>
                </div>
              </div>
            )}

            {pantry && (
              <div className="mt-10">
                <div className="border-t border-[#E8E4DF] mb-8" />
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <button
                    onClick={() => router.push(`/flavor?main=${encodeURIComponent(main)}`)}
                    className="flex-1 py-4 rounded-xl border border-[#E2DDD8] text-[12px] uppercase tracking-[0.08em] text-[#7A776E] active:bg-[#F0EDE8] transition-colors touch-manipulation font-light"
                  >
                    Try another pairing
                  </button>
                  <button
                    onClick={() => router.push('/')}
                    className="flex-1 py-4 rounded-xl bg-[#1A1714] text-[#F8F6F3] text-[12px] uppercase tracking-[0.08em] active:scale-[0.99] transition-all touch-manipulation"
                  >
                    New ingredient
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="h-10" />
    </main>
  )
}

export default function FlavorPage() {
  return (
    <Suspense fallback={
      <main className="min-h-[100dvh] bg-[#F8F6F3] flex items-center justify-center">
        <div className="w-6 h-6 border border-[#E2DDD8] border-t-[#6B7355] rounded-full animate-spin" />
      </main>
    }>
      <FlavorPageInner />
    </Suspense>
  )
}
