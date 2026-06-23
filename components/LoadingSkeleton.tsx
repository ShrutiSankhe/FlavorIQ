export default function LoadingSkeleton({ ingredient }: { ingredient: string }) {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#EEECEA]" />
        <div>
          <div className="h-6 w-36 bg-[#EEECEA] rounded mb-1.5" />
          <div className="h-3 w-48 bg-[#F0EFEB] rounded" />
        </div>
      </div>

      <div className="h-4 bg-[#F0EFEB] rounded w-full mb-2" />
      <div className="h-4 bg-[#F0EFEB] rounded w-4/5 mb-5" />

      <div className="flex gap-1.5 mb-6">
        {[80, 64, 72, 56, 88].map(w => (
          <div key={w} className="h-6 bg-[#EEECEA] rounded-full" style={{ width: w }} />
        ))}
      </div>

      <div className="h-3 w-28 bg-[#EEECEA] rounded mb-4" />
      {[1,2,3,4].map(i => (
        <div key={i} className="flex items-center gap-3 mb-2.5">
          <div className="h-3 w-20 bg-[#F0EFEB] rounded" />
          <div className="flex-1 h-[5px] bg-[#EEECEA] rounded-full" />
          <div className="h-3 w-8 bg-[#F0EFEB] rounded" />
        </div>
      ))}

      <div className="border-t border-[#EEECEA] my-6" />

      <div className="h-3 w-36 bg-[#EEECEA] rounded mb-4" />
      {[1,2,3,4].map(i => (
        <div key={i} className="flex gap-2.5 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#EEECEA] mt-1.5 shrink-0" />
          <div className="h-4 bg-[#F0EFEB] rounded w-full" />
        </div>
      ))}

      <p className="text-center text-[12px] text-[#C0BDB5] mt-8">
        Analyzing <span className="italic">{ingredient}</span>…
      </p>
    </div>
  )
}
