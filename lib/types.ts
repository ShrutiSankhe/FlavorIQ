export type FlavorProfile = {
  name: string
  region: string
  category: string
  flavor_tags: string[]
  heat_profile: 'warming' | 'cooling' | 'neutral'
  sensory: {
    heat: number
    intensity: number
    sweetness: number
    bitterness: number
  }
  summary: string
  traditional_pairings: { name: string; reason: string }[]
  contemporary_pairings: { name: string; reason: string }[]
}

export type PairingResult = {
  verdict: 'excellent' | 'good' | 'neutral' | 'challenging' | 'avoid'
  score: number
  why: string
  how_to_use: string
  shared_compounds: string[]
  alternatives?: string[]
}

export type AnalyzeResponse = {
  profile: FlavorProfile
  pairing: PairingResult | null
}
