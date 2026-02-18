export default function Loading() {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8 space-y-8 pt-5">

      {/* 🔵 Video Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-full space-y-3 animate-pulse"
          >
            {/* Thumbnail */}
            <div className="aspect-video rounded-xl bg-white/10" />

            {/* Title */}
            <div className="h-4 w-5/6 rounded bg-white/10" />

            {/* Subtitle */}
            <div className="h-3 w-3/6 rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  )
}
