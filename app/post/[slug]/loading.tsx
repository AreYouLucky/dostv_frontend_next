export default function PostLoading({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={`w-full border-b border-white/40 lg:px-10 px-4 md:px-5 pt-16 md:pt-18 lg:pt-22 ${className}`}>
      <div className="w-full animate-pulse">
        <div className=" w-full lg:h-160 md:h-120 h-80 bg-white/10" />

        <div className="w-full text-white flex flex-col md:flex-row md:pt-5 md:pb-6 py-4 px-4">
          <div className="md:pr-12 border-b md:border-b-0 md:border-r pb-6 md:pb-0 border-white/40 flex flex-col justify-center w-full">
            <div className="h-8 md:h-10 bg-white/10 rounded w-3/4 mb-3" />

            <div className="flex gap-2 items-center">
              <div className="h-6 w-28 rounded bg-white/10" />
              <div className="h-4 w-32 rounded bg-white/10" />
            </div>

            <div className="h-4 w-40 rounded bg-white/10 mt-3" />
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full bg-white/10 rounded" />
              <div className="h-3 w-full bg-white/10 rounded" />
              <div className="h-3 w-5/6 bg-white/10 rounded" />
              <div className="h-3 w-4/6 bg-white/10 rounded" />
            </div>
            <div className="flex gap-2 flex-wrap mt-6">
              <div className="h-5 w-16 bg-white/10 rounded-full" />
              <div className="h-5 w-20 bg-white/10 rounded-full" />
              <div className="h-5 w-14 bg-white/10 rounded-full" />
            </div>
          </div>
          <div className="md:w-180 lg:w-110 md:px-6 px-4 py-4 md:py-0 flex flex-col gap-3 w-full">
              <div className="flex items-center gap-3 flex-col">
                <div className="w-full aspect-video bg-white/10 rounded-md shrink-0" />
                <div className="flex flex-col gap-2 w-full">
                  <div className="h-4 bg-white/10 rounded w-11/12" />
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
