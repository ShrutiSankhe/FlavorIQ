import type { FlavorProfile } from '@/lib/types'

const TAG_STYLES: Record<string, string> = {
  warming:   'bg-amber-50 text-amber-800',
  floral:    'bg-purple-50 text-purple-800',
  herbal:    'bg-green-50 text-green-800',
  citrusy:   'bg-sky-50 text-sky-800',
  resinous:  'bg-orange-50 text-orange-800',
  cooling:   'bg-teal-50 text-teal-800',
  earthy:    'bg-stone-100 text-stone-700',
  smoky:     'bg-zinc-100 text-zinc-700',
  spicy:     'bg-red-50 text-red-800',
  sweet:     'bg-pink-50 text-pink-800',
  umami:     'bg-amber-100 text-amber-900',
  bitter:    'bg-lime-50 text-lime-800',
  woody:     'bg-yellow-50 text-yellow-800',
  pungent:   'bg-red-50 text-red-700',
  fermented: 'bg-amber-50 text-amber-900',
  nutty:     'bg-orange-50 text-orange-800',
  fruity:    'bg-pink-50 text-pink-800',
}

function tagStyle(tag: string): string {
  const key = Object.keys(TAG_STYLES).find(k => tag.toLowerCase().includes(k))
  return key ? TAG_STYLES[key] : 'bg-stone-100 text-stone-600'
}

function SensoryBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-2.5">
      <span className="text-[12px] text-[#999] w-20 shrink-0">{label}</span>
      <div className="flex-1 h-[5px] bg-[#EEECEA] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / 10) * 100}%` }} />
      </div>
      <span className="text-[11px] text-[#C0BDB5] w-8 text-right">{value}/10</span>
    </div>
  )
}

export default function FlavorCard({ profile }: { profile: FlavorProfile }) {
  const initial = profile.name?.[0]?.toUpperCase() ?? '?'

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#EAF3DE] flex items-center justify-center font-display text-xl text-[#27500A] shrink-0">
          {initial}
        </div>
        <div>
          <h2 className="font-display text-[24px] leading-tight text-[#1A1A1A]">{profile.name}</h2>
          <p className="text-[12px] text-[#999] mt-0.5">{profile.region} · {profile.category}</p>
        </div>
      </div>

      {/* Summary */}
      <p className="text-[13px] text-[#666] leading-relaxed mb-5">{profile.summary}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {profile.flavor_tags.map(tag => (
          <span key={tag} className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${tagStyle(tag)}`}>
            {tag}
          </span>
        ))}
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
          profile.heat_profile === 'warming' ? 'bg-amber-50 text-amber-700' :
          profile.heat_profile === 'cooling' ? 'bg-teal-50 text-teal-700' :
          'bg-stone-100 text-stone-600'
        }`}>
          {profile.heat_profile}
        </span>
      </div>

      {/* Sensory */}
      <p className="text-[10px] font-medium text-[#aaa] uppercase tracking-widest mb-3">Sensory profile</p>
      <SensoryBar label="Heat"      value={profile.sensory.heat}      color="bg-amber-400" />
      <SensoryBar label="Intensity" value={profile.sensory.intensity} color="bg-purple-400" />
      <SensoryBar label="Sweetness" value={profile.sensory.sweetness} color="bg-teal-400"  />
      <SensoryBar label="Bitterness"value={profile.sensory.bitterness}color="bg-orange-400"/>

      <div className="border-t border-[#EEECEA] my-6" />

      {/* Traditional pairings */}
      <p className="text-[10px] font-medium text-[#aaa] uppercase tracking-widest mb-3">Traditional pairings</p>
      <div className="space-y-3 mb-6">
        {profile.traditional_pairings.map(p => (
          <div key={p.name} className="flex items-start gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3B6D11] shrink-0 mt-[6px]" />
            <div>
              <span className="text-[13px] font-medium text-[#1A1A1A]">{p.name}</span>
              <span className="text-[11px] text-[#aaa] ml-2">{p.reason}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Contemporary pairings */}
      <div className="flex items-center gap-2 mb-3">
        <p className="text-[10px] font-medium text-[#aaa] uppercase tracking-widest">Contemporary pairings</p>
        <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-50 text-purple-700">creative</span>
      </div>
      <div className="space-y-3">
        {profile.contemporary_pairings.map(p => (
          <div key={p.name} className="flex items-start gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-[6px]" />
            <div>
              <span className="text-[13px] font-medium text-[#1A1A1A]">{p.name}</span>
              <span className="text-[11px] text-[#aaa] ml-2">{p.reason}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
