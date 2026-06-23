import { NextRequest, NextResponse } from 'next/server'
import { getFlavorProfile, getPairingResult } from '@/lib/claude'

export async function POST(req: NextRequest) {
  try {
    const { main, pantry } = await req.json()

    if (!main || typeof main !== 'string') {
      return NextResponse.json({ error: 'Missing main ingredient' }, { status: 400 })
    }

    const profile = await getFlavorProfile(main.trim())

    let pairing = null
    if (pantry && typeof pantry === 'string' && pantry.trim()) {
      pairing = await getPairingResult(main.trim(), pantry.trim())
    }

    return NextResponse.json({ profile, pairing })
  } catch (err: any) {
    console.error('[/api/analyze]', err)
    return NextResponse.json(
      { error: err?.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}
