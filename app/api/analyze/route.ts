import { NextRequest, NextResponse } from 'next/server'
import { getFlavorProfile, getPairingResult } from '@/lib/claude'
import {
  getCachedProfile, setCachedProfile,
  getCachedPairing, setCachedPairing
} from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { main, pantry } = await req.json()

    if (!main || typeof main !== 'string') {
      return NextResponse.json({ error: 'Missing main ingredient' }, { status: 400 })
    }

    const ingredient = main.trim()
    const pantryItem = pantry?.trim() || ''

    // ── Flavor profile: check cache first ──
    let profile = await getCachedProfile(ingredient)
    let profileSource = 'cache'

    if (!profile) {
      profile = await getFlavorProfile(ingredient)
      profileSource = 'claude'
      // Write to cache async (don't await — user doesn't need to wait)
      setCachedProfile(ingredient, profile)
    }

    // ── Pairing: check cache first ──
    let pairing = null
    let pairingSource = null

    if (pantryItem) {
      pairing = await getCachedPairing(ingredient, pantryItem)
      pairingSource = 'cache'

      if (!pairing) {
        pairing = await getPairingResult(ingredient, pantryItem)
        pairingSource = 'claude'
        setCachedPairing(ingredient, pantryItem, pairing)
      }
    }

    return NextResponse.json({
      profile,
      pairing,
      // Include source info for debugging (remove in production if preferred)
      _meta: { profileSource, pairingSource }
    })

  } catch (err: any) {
    console.error('[/api/analyze]', err)
    return NextResponse.json(
      { error: err?.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}
