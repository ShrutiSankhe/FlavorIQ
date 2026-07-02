export default function LoadingSkeleton({ ingredient }: { ingredient: string }) {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-full bg-[#EDEAE5]" />
        <div>
          <div className="h-6 w-40 bg-[#EDEAE5] rounded mb-2" />
          <div className="h-3 w-48 bg-[#F0EDE8] rounded" />
        </div>
      </div>

      <div className="h-4 bg-[#F0EDE8] rounded w-full mb-2" />
      <div className="h-4 bg-[#F0EDE8] rounded w-4/5 mb-6" />

      <div className="flex gap-1.5 mb-8 flex-wrap">
        {[76, 60, 68, 54, 84].map(w => (
          <div key={w} className="h-7 bg-[#EDEAE5] rounded-full" style={{ width: w }} />
        ))}
      </div>

      <div className="h-3 w-28 bg-[#EDEAE5] rounded mb-5" />
      {[1,2,3,4].map(i => (
        <div key={i} className="flex items-center gap-4 mb-3.5">
          <div className="h-3 w-20 bg-[#F0EDE8] rounded" />
          <div className="flex-1 h-[3px] bg-[#EAE7E1] rounded-full" />
          <div className="h-3 w-8 bg-[#F0EDE8] rounded" />
        </div>
      ))}

      <div className="border-t border-[#E8E4DF] my-8" />

      <div className="h-3 w-36 bg-[#EDEAE5] rounded mb-5" />
      {[1,2,3,4].map(i => (
        <div key={i} className="flex gap-3 mb-4">
          <div className="w-1 h-1 rounded-full bg-[#EDEAE5] mt-2 shrink-0" />
          <div className="h-4 bg-[#F0EDE8] rounded w-full" />
        </div>
      ))}

      <p className="text-center text-[12px] text-[#C4C1BA] mt-10 font-light italic">
        Analyzing {ingredient}…
      </p>
    </div>
  )
}
