import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function NewsCardSkeleton() {
  return (
    <Card className="glass border-primary/20 overflow-hidden">
      <div className="relative aspect-video w-full overflow-hidden bg-background/50">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-6">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}
