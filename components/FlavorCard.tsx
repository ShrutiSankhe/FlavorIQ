import type { FlavorProfile } from '@/lib/types'

// Refined palette — muted, botanical tag colors
const TAG_STYLES: Record<string, string> = {
  warming:   'bg-[#F0E9E0] text-[#8A6D4E]',
  floral:    'bg-[#EDEAF0] text-[#6E6580]',
  herbal:    'bg-[#EBF0E8] text-[#6B7355]',
  citrusy:   'bg-[#F0EFE3] text-[#7E7A4E]',
  resinous:  'bg-[#F0EBE3] text-[#846F55]',
  cooling:   'bg-[#E8EFED] text-[#5A7A70]',
  earthy:    'bg-[#EDEAE5] text-[#7A776E]',
  smoky:     'bg-[#EAE8E4] text-[#6E6A64]',
  spicy:     'bg-[#F2E8E4] text-[#96604E]',
  sweet:     'bg-[#F2EAE8] text-[#95706A]',
  umami:     'bg-[#F0EDE0] text-[#84754E]',
  bitter:    'bg-[#EDF0E5] text-[#6E7855]',
  woody:     'bg-[#F0EDE5] text-[#7E7052]',
  pungent:   'bg-[#F2E8E6] text-[#96635A]',
  fermented: 'bg-[#F0EDE2] text-[#847550]',
  nutty:     'bg-[#F0ECE4] text-[#82705A]',
  fruity:    'bg-[#F2EBE9] text-[#95706E]',
}

function tagStyle(tag: string): string {
  const key = Object.keys(TAG_STYLES).find(k => tag.toLowerCase().includes(k))
  return key ? TAG_STYLES[key] : 'bg-[#EDEAE5] text-[#7A776E]'
}

function SensoryBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-4 mb-3.5">
      <span className="text-[13px] text-[#5A564E] w-20 shrink-0 font-normal">{label}</span>
      <div className="flex-1 h-[3px] bg-[#EAE7E1] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-[#6B7355] transition-all duration-1000"
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
      <span className="text-[11px] text-[#C4C1BA] w-8 text-right font-light">{value}/10</span>
    </div>
  )
}

export default function FlavorCard({ profile }: { profile: FlavorProfile }) {
  const initial = profile.name?.[0]?.toUpperCase() ?? '?'

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-full bg-[#EBF0E8] flex items-center justify-center font-display text-[22px] text-[#6B7355] shrink-0">
          {initial}
        </div>
        <div>
          <h2 className="font-display text-[28px] leading-tight text-[#1A1714]">{profile.name}</h2>
          <p className="text-[12px] text-[#7A776E] mt-1 tracking-[0.06em] uppercase font-normal">
            {profile.region} · {profile.category}
          </p>
        </div>
      </div>

      {/* Summary — italic serif, like a menu description */}
      <p className="font-display italic text-[15px] text-[#5A564E] leading-[1.8] mb-6">
        {profile.summary}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {profile.flavor_tags.map(tag => (
          <span key={tag} className={`px-3 py-1.5 rounded-full text-[11px] font-light tracking-[0.02em] ${tagStyle(tag)}`}>
            {tag}
          </span>
        ))}
        <span className="px-3 py-1.5 rounded-full text-[11px] font-light tracking-[0.02em] bg-[#EBF0E8] text-[#6B7355]">
          {profile.heat_profile}
        </span>
      </div>

      {/* Sensory */}
      <p className="text-[13px] uppercase tracking-[0.12em] text-[#1A1714] mb-4 font-medium">Sensory profile</p>
      <SensoryBar label="Heat"       value={profile.sensory.heat}       />
      <SensoryBar label="Intensity"  value={profile.sensory.intensity}  />
      <SensoryBar label="Sweetness"  value={profile.sensory.sweetness}  />
      <SensoryBar label="Bitterness" value={profile.sensory.bitterness} />

      <div className="border-t border-[#E8E4DF] my-8" />

      {/* Traditional pairings */}
      <p className="text-[13px] uppercase tracking-[0.12em] text-[#1A1714] mb-4 font-medium">Traditional pairings</p>
      <div className="space-y-4 mb-8">
        {profile.traditional_pairings.map(p => (
          <div key={p.name} className="flex items-baseline gap-3">
            <div className="w-1 h-1 rounded-full bg-[#6B7355] shrink-0" />
            <div>
              <span className="text-[14px] text-[#1A1714]">{p.name}</span>
              <span className="text-[12px] text-[#B0ADA8] ml-2.5 font-light">{p.reason}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Contemporary pairings */}
      <p className="text-[13px] uppercase tracking-[0.12em] text-[#1A1714] mb-4 font-medium">
        Contemporary pairings
      </p>
      <div className="space-y-4">
        {profile.contemporary_pairings.map(p => (
          <div key={p.name} className="flex items-baseline gap-3">
            <div className="w-1 h-1 rounded-full bg-[#B0ADA8] shrink-0" />
            <div>
              <span className="text-[14px] text-[#1A1714]">{p.name}</span>
              <span className="text-[12px] text-[#B0ADA8] ml-2.5 font-light">{p.reason}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
