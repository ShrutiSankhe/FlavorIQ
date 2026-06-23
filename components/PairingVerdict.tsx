import type { PairingResult } from '@/lib/types'

type VerdictConfig = {
  label: string
  icon: string
  cardBg: string
  cardBorder: string
  iconBg: string
  iconText: string
  titleColor: string
  divider: string
}

const VERDICT: Record<string, VerdictConfig> = {
  excellent:   { label: 'Excellent pairing', icon: '✓', cardBg: 'bg-[#EAF3DE]', cardBorder: 'border-[#97C459]', iconBg: 'bg-[#3B6D11]', iconText: 'text-white', titleColor: 'text-[#27500A]', divider: 'border-[#C0DD97]' },
  good:        { label: 'Good pairing',      icon: '✓', cardBg: 'bg-[#EAF3DE]', cardBorder: 'border-[#97C459]', iconBg: 'bg-[#4F8A1F]', iconText: 'text-white', titleColor: 'text-[#27500A]', divider: 'border-[#C0DD97]' },
  neutral:     { label: 'Neutral pairing',   icon: '~', cardBg: 'bg-stone-50',   cardBorder: 'border-stone-200', iconBg: 'bg-stone-400',   iconText: 'text-white', titleColor: 'text-stone-700', divider: 'border-stone-200' },
  challenging: { label: 'Challenging',       icon: '!', cardBg: 'bg-amber-50',   cardBorder: 'border-amber-200', iconBg: 'bg-amber-500',   iconText: 'text-white', titleColor: 'text-amber-900', divider: 'border-amber-200' },
  avoid:       { label: 'Avoid this pairing',icon: '✕', cardBg: 'bg-red-50',     cardBorder: 'border-red-200',   iconBg: 'bg-red-600',     iconText: 'text-white', titleColor: 'text-red-900',   divider: 'border-red-200'   },
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
    <div className="mt-8">
      <div className="border-t border-[#EEECEA] mb-6" />

      <p className="text-[10px] font-medium text-[#aaa] uppercase tracking-widest mb-3">Pairing analysis</p>

      {/* Ingredient pills */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="px-3 py-1.5 rounded-lg bg-white border border-[#E0DED8] text-[13px] font-medium text-[#1A1A1A]">{main}</span>
        <span className="text-[#C0BDB5] text-base">+</span>
        <span className="px-3 py-1.5 rounded-lg bg-white border border-[#E0DED8] text-[13px] font-medium text-[#1A1A1A]">{pantry}</span>
      </div>

      {/* Verdict card */}
      <div className={`rounded-xl p-4 border ${cfg.cardBg} ${cfg.cardBorder}`}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${cfg.iconBg} ${cfg.iconText}`}>
            {cfg.icon}
          </div>
          <span className={`text-[13px] font-medium ${cfg.titleColor}`}>
            {cfg.label} · {result.score}% match
          </span>
        </div>
        <p className="text-[13px] text-[#555] leading-relaxed mb-3">{result.why}</p>
        <div className={`border-t pt-3 ${cfg.divider}`}>
          <p className="text-[12px] text-[#777] leading-relaxed">{result.how_to_use}</p>
        </div>
      </div>

      {/* Shared compounds */}
      {result.shared_compounds?.length > 0 && (
        <div className="mt-5">
          <p className="text-[10px] font-medium text-[#aaa] uppercase tracking-widest mb-2">Flavor overlap</p>
          <div className="flex flex-wrap gap-1.5 mb-1">
            {result.shared_compounds.map(c => (
              <span key={c} className="px-2.5 py-1 rounded-full text-[11px] bg-[#EAF3DE] text-[#27500A]">{c}</span>
            ))}
          </div>
          <p className="text-[11px] text-[#C0BDB5] mt-1">Shared characteristics that connect these ingredients</p>
        </div>
      )}

      {/* Alternatives */}
      {result.alternatives && result.alternatives.length > 0 && (
        <div className="mt-5">
          <p className="text-[10px] font-medium text-[#aaa] uppercase tracking-widest mb-2">Better alternatives to {pantry}</p>
          <div className="flex flex-wrap gap-1.5">
            {result.alternatives.map(a => (
              <span key={a} className="px-2.5 py-1 rounded-full text-[11px] bg-white border border-[#E0DED8] text-[#555]">{a}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
