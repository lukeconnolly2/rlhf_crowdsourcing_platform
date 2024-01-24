import { Card, CardContent, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

function NumberCardSkeleton() {
  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader>
          <Skeleton className="h-10 w-full" />
        </CardHeader>
        <CardContent className="flex gap-5">
          <Skeleton className="h-16 w-full " />
        </CardContent>
      </Card>
    </div>
  )
}
export default NumberCardSkeleton
