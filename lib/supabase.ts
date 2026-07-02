import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getCachedProfile(ingredient: string) {
  const slug = ingredient.toLowerCase().trim()
  try {
    const { data, error } = await supabase
      .from('ingredients')
      .select('profile')
      .eq('slug', slug)
      .limit(1)
    if (error || !data || data.length === 0) return null
    return data[0].profile
  } catch {
    return null
  }
}

export async function setCachedProfile(ingredient: string, profile: object) {
  const slug = ingredient.toLowerCase().trim()
  try {
    const { error } = await supabase
      .from('ingredients')
      .insert({ slug, name: ingredient, profile })
    if (error && error.code !== '23505') {
      console.error('[cache] Write error:', error)
    }
  } catch (err) {
    console.error('[cache] Exception:', err)
  }
}

export async function getCachedPairing(a: string, b: string) {
  const [ia, ib] = [a, b].map(s => s.toLowerCase().trim()).sort()
  try {
    const { data, error } = await supabase
      .from('pairings')
      .select('result')
      .eq('ingredient_a', ia)
      .eq('ingredient_b', ib)
      .limit(1)
    if (error || !data || data.length === 0) return null
    return data[0].result
  } catch {
    return null
  }
}

export async function setCachedPairing(a: string, b: string, result: object) {
  const [ia, ib] = [a, b].map(s => s.toLowerCase().trim()).sort()
  try {
    const { error } = await supabase
      .from('pairings')
      .insert({ ingredient_a: ia, ingredient_b: ib, result })
    if (error && error.code !== '23505') {
      console.error('[cache] Pairing write error:', error)
    }
  } catch (err) {
    console.error('[cache] Pairing exception:', err)
  }
}
