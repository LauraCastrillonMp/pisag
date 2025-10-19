import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function MediaCardSkeleton() {
  return (
    <Card className="glass border-primary/20 overflow-hidden">
      <div className="relative aspect-video w-full overflow-hidden bg-background/50">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
    </Card>
  )
}
