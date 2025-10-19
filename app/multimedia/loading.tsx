import { MediaCardSkeleton } from "@/components/media-card-skeleton"

export default function MultimediaLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <section className="cosmic-bg py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-8 w-8 bg-muted animate-pulse rounded" />
              <div className="h-12 w-64 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-6 w-96 bg-muted animate-pulse rounded mx-auto" />
          </div>
        </div>
      </section>

      {/* Filters Skeleton */}
      <section className="border-b border-primary/20 glass sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="h-10 w-full bg-muted animate-pulse rounded" />
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="h-10 w-full md:w-96 bg-muted animate-pulse rounded" />
              <div className="h-10 w-full md:w-64 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <MediaCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}