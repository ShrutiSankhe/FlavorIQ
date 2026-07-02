import type { PairingResult } from '@/lib/types'

type VerdictConfig = {
  label: string
  cardBg: string
  cardBorder: string
  titleColor: string
  divider: string
  dot: string
}

// Muted, refined verdict colors — no loud greens or reds
const VERDICT: Record<string, VerdictConfig> = {
  excellent:   { label: 'An excellent pairing', cardBg: 'bg-[#EBF0E8]', cardBorder: 'border-[#D5DECE]', titleColor: 'text-[#4E5A3E]', divider: 'border-[#D5DECE]', dot: 'bg-[#6B7355]' },
  good:        { label: 'A good pairing',       cardBg: 'bg-[#EBF0E8]', cardBorder: 'border-[#D5DECE]', titleColor: 'text-[#4E5A3E]', divider: 'border-[#D5DECE]', dot: 'bg-[#8A9478]' },
  neutral:     { label: 'A neutral pairing',    cardBg: 'bg-[#F0EDE8]', cardBorder: 'border-[#E2DDD8]', titleColor: 'text-[#7A776E]', divider: 'border-[#E2DDD8]', dot: 'bg-[#B0ADA8]' },
  challenging: { label: 'A challenging pairing',cardBg: 'bg-[#F2EEE2]', cardBorder: 'border-[#E5DDC8]', titleColor: 'text-[#84754E]', divider: 'border-[#E5DDC8]', dot: 'bg-[#B0A275]' },
  avoid:       { label: 'Better kept apart',    cardBg: 'bg-[#F2EAE6]', cardBorder: 'border-[#E5D5CE]', titleColor: 'text-[#96604E]', divider: 'border-[#E5D5CE]', dot: 'bg-[#BC8B7A]' },
}

export default function PairingVerdict({
  main, pantry, result
}: {
  main: string
  pantry: string
  result: PairingResult
}) {
  const cfg = VERDICT[result.verdict] ?? VERDICT.neutral

  return (
    <div className="mt-10">
      <div className="border-t border-[#E8E4DF] mb-8" />

      <p className="text-[13px] uppercase tracking-[0.12em] text-[#1A1714] mb-4 font-medium">Pairing analysis</p>

      {/* Ingredient names — serif, like a menu line */}
      <p className="font-display text-[19px] text-[#1A1714] mb-5">
        {main} <span className="text-[#B0ADA8] font-light mx-1">&</span> {pantry}
      </p>

      {/* Verdict card */}
      <div className={`rounded-xl p-5 border ${cfg.cardBg} ${cfg.cardBorder}`}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot} shrink-0`} />
          <span className={`font-display italic text-[15px] ${cfg.titleColor}`}>
            {cfg.label}
          </span>
          <span className={`text-[11px] ${cfg.titleColor} opacity-60 ml-auto font-light`}>
            {result.score}/100
          </span>
        </div>
        <p className="text-[13px] text-[#5A564E] leading-[1.8] mb-4 font-light">{result.why}</p>
        <div className={`border-t pt-4 ${cfg.divider}`}>
          <p className="text-[12px] text-[#7A776E] leading-[1.7] font-light">{result.how_to_use}</p>
        </div>
      </div>

      {/* Shared compounds */}
      {result.shared_compounds?.length > 0 && (
        <div className="mt-6">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#1A1714] mb-3 font-medium">What connects them</p>
          <div className="flex flex-wrap gap-1.5">
            {result.shared_compounds.map(c => (
              <span key={c} className="px-3 py-1.5 rounded-full text-[11px] bg-[#EBF0E8] text-[#6B7355] font-light">{c}</span>
            ))}
          </div>
        </div>
      )}

      {/* Alternatives */}
      {result.alternatives && result.alternatives.length > 0 && (
        <div className="mt-6">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#1A1714] mb-3 font-medium">
            Consider instead
          </p>
          <div className="flex flex-wrap gap-1.5">
            {result.alternatives.map(a => (
              <span key={a} className="px-3 py-1.5 rounded-full text-[11px] bg-[#F0EDE8] border border-[#E2DDD8] text-[#7A776E] font-light">{a}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
