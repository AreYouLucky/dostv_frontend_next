export default function TopYouTubeSkeleton() {
  return (
    <div className="w-full h-full p-4 md:p-7 rounded-2xl bg-white/90 border border-slate-100 shadow-sm flex flex-col gap-4 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-200" />
        <div className="space-y-1">
          <div className="h-3 w-40 rounded bg-slate-200" />
          <div className="h-2 w-24 rounded bg-slate-100" />
        </div>
      </div>

      {/* Top Video Skeleton */}
      <div className="rounded-2xl bg-slate-800 p-5 flex gap-3">
        <div className="w-28 h-20 rounded-xl bg-slate-700" />

        <div className="flex-1 space-y-2">
          <div className="h-3 w-3/4 rounded bg-slate-600" />
          <div className="h-3 w-full rounded bg-slate-700" />
          <div className="h-3 w-2/3 rounded bg-slate-700" />

          <div className="h-5 w-24 rounded-full bg-slate-600 mt-2" />
        </div>
      </div>

      {/* List Skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100"
          >
            <div className="w-7 h-7 rounded-full bg-slate-200" />
            <div className="w-16 h-11 rounded-lg bg-slate-200" />

            <div className="flex-1 space-y-2">
              <div className="h-3 w-full rounded bg-slate-200" />
              <div className="h-3 w-2/3 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
