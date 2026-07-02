import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ── Ingredient cache ──────────────────────────────────────────

export async function getCachedProfile(ingredient: string) {
  const slug = ingredient.toLowerCase().trim()
  try {
    const { data, error } = await supabase
      .from('ingredients')
      .select('profile')
      .eq('slug', slug)
      .limit(1)
    if (error || !data || data.length === 0) return null
    console.log('[cache] Hit for:', slug)
    return data[0].profile
  } catch {
    return null
  }
}
export async function setCachedProfile(ingredient: string, profile: 
object) {
  const slug = ingredient.toLowerCase().trim()
  try {
    const { error } = await supabase
      .from('ingredients')
      .insert({ slug, name: ingredient, profile })
    // 23505 = duplicate key — already cached, that's fine
    if (error && error.code !== '23505') {
      console.error('[cache] Write error:', error)
    } else {
      console.log('[cache] Saved:', slug)
    }
  } catch (err) {
    console.error('[cache] Exception:', err)
  }
}

// ── Pairing cache ─────────────────────────────────────────────

export async function getCachedPairing(a: string, b: string) {
  // Always sort alphabetically so a+b and b+a hit the same row
  const [ia, ib] = [a, b].map(s => s.toLowerCase().trim()).sort()
  try {
    const { data, error } = await supabase
      .from('pairings')
      .select('result')
      .eq('ingredient_a', ia)
      .eq('ingredient_b', ib)
      .single()
    if (error || !data) return null
    return data.result
  } catch {
    return null
  }
}

export async function setCachedPairing(a: string, b: string, result: object) {
  const [ia, ib] = [a, b].map(s => s.toLowerCase().trim()).sort()
  try {
    await supabase
     .from('pairings')
     .insert({ ingredient_a: ia, ingredient_b: ib, result })
  } catch {
    // Cache write failure is non-fatal
    if (error && error.code !== '23505') {
    console.error('[cache] Pairing write error:', error)}
  }
}
